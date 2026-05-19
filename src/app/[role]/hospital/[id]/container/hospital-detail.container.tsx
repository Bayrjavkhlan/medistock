"use client";

import { useQuery } from "@apollo/client/react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { Alert, Chip, Stack } from "@mui/material";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import EntityLocationMap from "@/components/detail/EntityLocationMap";
import {
  HospitalDetailDocument,
  type HospitalDetailQuery,
  type HospitalDetailQueryVariables,
} from "@/features/hospital/graphql/queries.gql";
import { getHospitalSubjectForRole, getPortalRole } from "@/lib/casl";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
} from "@/utils/detailFormatters";

type HospitalDetailContainerProps = {
  id: string;
};

export default function HospitalDetailContainer({
  id,
}: HospitalDetailContainerProps) {
  const { data: session } = useSession();
  const portalRole = getPortalRole(session?.user ?? null, null);
  const subject = getHospitalSubjectForRole(portalRole);

  const { data, loading, error } = useQuery<
    HospitalDetailQuery,
    HospitalDetailQueryVariables
  >(HospitalDetailDocument, {
    variables: { hospitalDetailId: id },
    fetchPolicy: "no-cache",
  });

  const hospital = data?.hospitalDetail;

  const addressText = formatAddress([
    hospital?.address?.address1,
    hospital?.address?.address2,
    hospital?.address?.province,
  ]);

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Эмнэлгийн мэдээллийг уншиж байна..." loading />
      ) : error ? (
        <StateView
          title="Эмнэлгийн мэдээлэл ачаалахад алдаа гарлаа"
          description={error.message}
        />
      ) : !hospital ? (
        <StateView
          title="Эмнэлгийн мэдээлэл олдсонгүй"
          description="Хүссэн эмнэлгийн бүртгэл байхгүй эсвэл харах эрх хүрэлцэхгүй байна."
        />
      ) : (
        <DetailPageShell
          title={hospital.name ?? "Эмнэлгийн дэлгэрэнгүй"}
          subtitle="Байршил, холбоо барих мэдээлэл болон системд бүртгэгдсэн үндсэн дэлгэрэнгүйг нэг дороос харна уу."
          typeLabel="Эмнэлэг"
          meta={[
            `Шинэчлэгдсэн: ${formatDateTime(hospital.updatedAt)}`,
            `Бүртгэсэн: ${formatDateTime(hospital.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Бүртгэлийн төлөв"
                value="Идэвхтэй"
                tone="success"
              />
              <DetailMetricCard
                label="Байршлын мэдээлэл"
                value={
                  hospital.address?.latitude != null &&
                  hospital.address?.longitude != null
                    ? "Бэлэн"
                    : "Дутуу"
                }
                tone={
                  hospital.address?.latitude != null &&
                  hospital.address?.longitude != null
                    ? "success"
                    : "warning"
                }
              />
              <DetailSectionCard
                title="Хурдан мэдээлэл"
                description="Эмнэлгийн гол мэдээллийг товч харуулах самбар."
                eyebrow="Тойм"
              >
                <Stack spacing={1.5}>
                  <Chip
                    icon={<PhoneRoundedIcon />}
                    label={`Утас: ${formatNullable(hospital.phone)}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<EmailRoundedIcon />}
                    label={`И-мэйл: ${formatNullable(hospital.email)}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocalHospitalRoundedIcon />}
                    label={`Хаяг: ${addressText || "Бүртгэгдээгүй"}`}
                    variant="outlined"
                  />
                </Stack>
              </DetailSectionCard>
            </>
          }
        >
          <DetailSectionCard
            title="Үндсэн мэдээлэл"
            description="Өвчтөн, ажилтан болон удирдлагад хэрэгтэй эмнэлгийн үндсэн мэдээлэл."
            eyebrow="Мэдээлэл"
          >
            <DetailFactGrid
              items={[
                {
                  label: "Эмнэлгийн нэр",
                  value: formatNullable(hospital.name),
                },
                { label: "И-мэйл", value: formatNullable(hospital.email) },
                { label: "Утас", value: formatNullable(hospital.phone) },
                { label: "Хаяг", value: addressText || "Бүртгэгдээгүй" },
                { label: "Ажиллах цаг", value: "Системд бүртгэгдээгүй" },
                { label: "Тайлбар", value: "Системд бүртгэгдээгүй" },
              ]}
            />
          </DetailSectionCard>

          <EntityLocationMap
            title="Эмнэлгийн байршил"
            entityLabel="Эмнэлэг"
            entityName={hospital.name ?? "Эмнэлэг"}
            entityAddress={addressText || "Хаяг бүртгэгдээгүй"}
            latitude={hospital.address?.latitude}
            longitude={hospital.address?.longitude}
          />

          <DetailSectionCard
            title="Анхаарах зүйлс"
            description="Мэдээлэл дутуу тохиолдолд систем тасалдахгүй, хэрэглэгч ойлгомжтой дэлгэц харна."
            eyebrow="Тайлбар"
          >
            <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
              Ажиллах цаг, тайлбар зэрэг нэмэлт талбарууд одоогоор өгөгдлийн
              санд байхгүй тул энэ хуудсанд зөвхөн одоо байгаа мэдээллийг
              найдвартай харуулж байна.
            </Alert>
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
