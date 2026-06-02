import { gql } from "@apollo/client";

export const EQUIPMENTS = gql`
  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {
    equipments(take: $take, skip: $skip, where: $where) {
      data {
        id
        name
        serialNo
        brand
        model
        manufacturedYear
        commissionedDate
        endOfLifeDate
        passportDocument
        usageManualDocument
        calibrationInstructionDocument
        maintenancePlan
        requiredParts
        usedParts
        sparePartsStock
        assignedTo {
          id
          name
          email
          phone
        }
        state
        category
        hospital {
          id
          name
          email
        }
      }
      count
    }
  }
`;

export const EQUIPMENT_DETAIL = gql`
  query EquipmentDetail($equipmentDetailId: String!) {
    equipmentDetail(id: $equipmentDetailId) {
      id
      name
      serialNo
      brand
      model
      manufacturedYear
      commissionedDate
      endOfLifeDate
      passportDocument
      usageManualDocument
      calibrationInstructionDocument
      maintenancePlan
      requiredParts
      usedParts
      sparePartsStock
      category
      state
      createdAt
      updatedAt
      assignedTo {
        id
        name
        email
        phone
      }
      hospital {
        id
        name
        email
      }
      logs {
        id
        description
        type
        faultDate
        problem
        repairAction
        status
        createdAt
        performedBy {
          id
          name
          email
        }
      }
    }
  }
`;
