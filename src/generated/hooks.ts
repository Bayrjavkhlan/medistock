"use client";

import { useQuery } from "@apollo/client/react";
import type { QueryHookOptions } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import type {
  EquipmentsQuery,
  EquipmentsQueryVariables,
  HospitalsQuery,
  HospitalsQueryVariables,
  MembershipsQuery,
  MembershipsQueryVariables,
  MeQuery,
  MeQueryVariables,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  EquipmentLogs,
  EquipmentLogsWhereInput,
  PharmaciesWhereInput,
  Pharmacys,
  Scalars,
  InputMaybe,
  Exact,
} from "./graphql";
import {
  EquipmentsDocument,
  HospitalsDocument,
  MembershipsDocument,
  MeDocument,
  CurrentUserDocument,
} from "./graphql";

export type EquipmentLogsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<EquipmentLogsWhereInput>;
}>;

export type EquipmentLogsQuery = {
  __typename?: "Query";
  equipmentLogs?: EquipmentLogs | null;
};

export type PharmaciesQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<PharmaciesWhereInput>;
}>;

export type PharmaciesQuery = {
  __typename?: "Query";
  pharmacies?: Pharmacys | null;
};

export const EquipmentLogsDocument = gql`
  query EquipmentLogs(
    $take: Int!
    $skip: Int!
    $where: EquipmentLogsWhereInput
  ) {
    equipmentLogs(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        description
        type
        faultDate
        problem
        repairAction
        status
        createdAt
        equipment {
          id
          name
          serialNo
          state
          category
          hospital {
            id
            name
          }
        }
        performedBy {
          id
          name
          email
        }
      }
    }
  }
` as DocumentNode<EquipmentLogsQuery, EquipmentLogsQueryVariables>;

export const PharmaciesDocument = gql`
  query Pharmacies($take: Int!, $skip: Int!, $where: PharmaciesWhereInput) {
    pharmacies(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        name
        email
        phone
        address {
          address1
          address2
          province
        }
      }
    }
  }
` as DocumentNode<PharmaciesQuery, PharmaciesQueryVariables>;

export const useEquipmentsQuery = (
  options: QueryHookOptions<EquipmentsQuery, EquipmentsQueryVariables>,
) => useQuery(EquipmentsDocument, options);

export const useHospitalsQuery = (
  options: QueryHookOptions<HospitalsQuery, HospitalsQueryVariables>,
) => useQuery(HospitalsDocument, options);

export const useMembershipsQuery = (
  options: QueryHookOptions<MembershipsQuery, MembershipsQueryVariables>,
) => useQuery(MembershipsDocument, options);

export const useMeQuery = (
  options?: QueryHookOptions<MeQuery, MeQueryVariables>,
) => useQuery(MeDocument, options);

export const useCurrentUserQuery = (
  options?: QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) => useQuery(CurrentUserDocument, options);

export const useEquipmentLogsQuery = (
  options: QueryHookOptions<EquipmentLogsQuery, EquipmentLogsQueryVariables>,
) => useQuery(EquipmentLogsDocument, options);

export const usePharmaciesQuery = (
  options: QueryHookOptions<PharmaciesQuery, PharmaciesQueryVariables>,
) => useQuery(PharmaciesDocument, options);
