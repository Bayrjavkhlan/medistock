"use client";

import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { Alert, Box, Chip, Stack, Typography } from "@mui/material";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import DetailSectionCard from "./DetailSectionCard";

type EntityLocationMapProps = {
  title: string;
  entityLabel: string;
  entityName: string;
  entityAddress: string;
  latitude?: number | null;
  longitude?: number | null;
};

type UserLocationState =
  | { status: "loading" }
  | { status: "success"; latitude: number; longitude: number }
  | { status: "denied"; message: string }
  | { status: "unavailable"; message: string }
  | { status: "unsupported"; message: string };

const entityIcon = L.divIcon({
  className: "",
  html: `
    <span style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:22px;
      height:22px;
      border-radius:9999px;
      background:#0f766e;
      border:4px solid #ffffff;
      box-shadow:0 6px 18px rgba(15,118,110,0.38);
    "></span>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -14],
});

const userIcon = L.divIcon({
  className: "",
  html: `
    <span style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:22px;
      height:22px;
      border-radius:9999px;
      background:#2563eb;
      border:4px solid #ffffff;
      box-shadow:0 6px 18px rgba(37,99,235,0.38);
    "></span>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -14],
});

function FitMap({ points }: { points: Array<[number, number]> }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14);
      return;
    }

    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, points]);

  return null;
}

export default function EntityLocationMap({
  title,
  entityLabel,
  entityName,
  entityAddress,
  latitude,
  longitude,
}: EntityLocationMapProps) {
  const [userLocation, setUserLocation] = useState<UserLocationState>({
    status: "loading",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation({
        status: "unsupported",
        message:
          "Таны төхөөрөмж байршил тодорхойлох боломжийг дэмжихгүй байна.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          status: "success",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setUserLocation({
            status: "denied",
            message:
              "Таны байршлыг үзүүлэх зөвшөөрөл олгогдоогүй байна. Газрын зураг эмнэлэг, эмийн сангийн байршлаар харагдана.",
          });
          return;
        }

        setUserLocation({
          status: "unavailable",
          message:
            "Таны байршлыг одоогоор тодорхойлж чадсангүй. Дараа дахин оролдоно уу.",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      },
    );
  }, []);

  const hasEntityLocation =
    typeof latitude === "number" && typeof longitude === "number";

  const points = useMemo(() => {
    const items: Array<[number, number]> = [];

    if (hasEntityLocation) {
      items.push([latitude as number, longitude as number]);
    }

    if (userLocation.status === "success") {
      items.push([userLocation.latitude, userLocation.longitude]);
    }

    return items;
  }, [hasEntityLocation, latitude, longitude, userLocation]);

  if (!hasEntityLocation) {
    return (
      <DetailSectionCard
        title={title}
        description="Газрын зургийн мэдээлэл бэлэн болмогц энд харагдана."
        eyebrow="Байршил"
      >
        <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
          Энэ байгууллагын координат бүртгэгдээгүй байна. Хаягийн мэдээллийг
          доорх картуудаас харна уу.
        </Alert>
      </DetailSectionCard>
    );
  }

  return (
    <DetailSectionCard
      title={title}
      description="Байгууллагын байршил болон таны одоогийн байршлыг нэг газрын зураг дээр харуулна."
      eyebrow="Газрын зураг"
      action={
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            icon={<PlaceRoundedIcon />}
            label={entityLabel}
            sx={{ bgcolor: "rgba(15,118,110,0.1)", color: "#0f766e" }}
          />
          <Chip
            icon={<MyLocationRoundedIcon />}
            label="Миний байршил"
            sx={{ bgcolor: "rgba(37,99,235,0.1)", color: "#1d4ed8" }}
          />
        </Stack>
      }
    >
      <Stack spacing={2}>
        {userLocation.status !== "success" &&
        userLocation.status !== "loading" ? (
          <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
            {userLocation.message}
          </Alert>
        ) : null}

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "0.75rem",
            border: "1px solid",
            borderColor: "divider",
            height: { xs: 320, md: 420 },
          }}
        >
          <MapContainer
            center={[latitude as number, longitude as number]}
            zoom={14}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitMap points={points} />
            <Marker
              position={[latitude as number, longitude as number]}
              icon={entityIcon}
            >
              <Popup>
                <Typography fontWeight={800}>{entityName}</Typography>
                <Typography variant="body2">{entityAddress}</Typography>
              </Popup>
            </Marker>
            {userLocation.status === "success" ? (
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={userIcon}
              >
                <Popup>
                  <Typography fontWeight={800}>Таны байршил</Typography>
                </Popup>
              </Marker>
            ) : null}
          </MapContainer>
        </Box>
      </Stack>
    </DetailSectionCard>
  );
}
