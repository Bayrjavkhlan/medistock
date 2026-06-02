/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n": typeof types.LoginDocument;
  "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      message\n    }\n  }\n": typeof types.SignUpDocument;
  "\n  mutation VerifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input) {\n      message\n    }\n  }\n": typeof types.VerifyOtpDocument;
  "\n  mutation ResendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input) {\n      message\n    }\n  }\n": typeof types.ResendOtpDocument;
  "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n": typeof types.LogoutDocument;
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n": typeof types.RefreshAccessTokenDocument;
  "\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n": typeof types.SelectOrganizationDocument;
  "\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n": typeof types.MeDocument;
  "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n": typeof types.CurrentUserDocument;
  "\n  query DashboardOverview {\n    dashboardOverview {\n      role\n      admin {\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        growthSeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        recentItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        topHospitals {\n          label\n          value\n          helper\n          tone\n        }\n        topPharmacies {\n          label\n          value\n          helper\n          tone\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n        map {\n          hospitals {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n          drugstores {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n        }\n      }\n      hospital {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        equipmentStates {\n          label\n          value\n          helper\n          tone\n        }\n        recentLogs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        upcomingBookings {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        nearbyPharmacies {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n      pharmacy {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        topDrugs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        lowStockItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        recentUpdates {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n    }\n  }\n": typeof types.DashboardOverviewDocument;
  "\n  query AdminMapLocations {\n    adminMapLocations {\n      hospitals {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n      drugstores {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n    }\n  }\n": typeof types.AdminMapLocationsDocument;
  "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n": typeof types.EquipmentCreateDocument;
  "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n": typeof types.EquipmentUpdateDocument;
  "\n  mutation EquipmentDelete($equipmentDeleteId: String!) {\n    equipmentDelete(id: $equipmentDeleteId)\n  }\n": typeof types.EquipmentDeleteDocument;
  "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        brand\n        model\n        manufacturedYear\n        commissionedDate\n        endOfLifeDate\n        passportDocument\n        usageManualDocument\n        calibrationInstructionDocument\n        maintenancePlan\n        requiredParts\n        usedParts\n        sparePartsStock\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n": typeof types.EquipmentsDocument;
  "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      brand\n      model\n      manufacturedYear\n      commissionedDate\n      endOfLifeDate\n      passportDocument\n      usageManualDocument\n      calibrationInstructionDocument\n      maintenancePlan\n      requiredParts\n      usedParts\n      sparePartsStock\n      category\n      state\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      hospital {\n        id\n        name\n        email\n      }\n      logs {\n        id\n        description\n        type\n        faultDate\n        problem\n        repairAction\n        status\n        createdAt\n        performedBy {\n          id\n          name\n          email\n        }\n      }\n    }\n  }\n": typeof types.EquipmentDetailDocument;
  "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n": typeof types.HospitalCreateDocument;
  "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n": typeof types.HospitalUpdateDocument;
  "\n  mutation HospitalDelete($hospitalDeleteId: String!) {\n    hospitalDelete(id: $hospitalDeleteId)\n  }\n": typeof types.HospitalDeleteDocument;
  "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n": typeof types.HospitalsDocument;
  "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n": typeof types.HospitalDetailDocument;
  "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n": typeof types.HospitalOptionDocument;
  "\n  mutation DrugCreate($input: DrugCreateInput!) {\n    drugCreate(input: $input)\n  }\n": typeof types.DrugCreateDocument;
  "\n  mutation DrugUpdate($drugUpdateId: String!, $input: DrugCreateInput!) {\n    drugUpdate(id: $drugUpdateId, input: $input)\n  }\n": typeof types.DrugUpdateDocument;
  "\n  mutation DrugDelete($id: String!) {\n    drugDelete(id: $id)\n  }\n": typeof types.DrugDeleteDocument;
  "\n  mutation PharmacyDrugUpsert($input: PharmacyDrugUpsertInput!) {\n    pharmacyDrugUpsert(input: $input)\n  }\n": typeof types.PharmacyDrugUpsertDocument;
  "\n  mutation PharmacyDrugDelete($drugId: String!) {\n    pharmacyDrugDelete(drugId: $drugId)\n  }\n": typeof types.PharmacyDrugDeleteDocument;
  "\n  query Drugs($take: Int!, $skip: Int!, $where: DrugsWhereInput) {\n    drugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        genericName\n        dosageForm\n        strength\n        manufacturer\n        description\n        totalStock\n        startingPrice\n        availabilityCount\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.DrugsDocument;
  "\n  query PharmacyDrugs(\n    $take: Int!\n    $skip: Int!\n    $where: PharmacyDrugsWhereInput\n  ) {\n    pharmacyDrugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n          description\n        }\n      }\n    }\n  }\n": typeof types.PharmacyDrugsDocument;
  "\n  query DrugDetail($drugDetailId: String!) {\n    drugDetail(id: $drugDetailId) {\n      id\n      name\n      genericName\n      dosageForm\n      strength\n      manufacturer\n      description\n      totalStock\n      startingPrice\n      availabilityCount\n      createdAt\n      updatedAt\n      availability {\n        id\n        pharmacyId\n        organizationId\n        pharmacyName\n        pharmacyEmail\n        pharmacyPhone\n        quantity\n        price\n        status\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n": typeof types.DrugDetailDocument;
  "\n  mutation PharmacyCreate($input: PharmacyCreateInput!) {\n    pharmacyCreate(input: $input)\n  }\n": typeof types.PharmacyCreateDocument;
  "\n  mutation PharmacyUpdate(\n    $pharmacyUpdateId: String!\n    $input: PharmacyCreateInput!\n  ) {\n    pharmacyUpdate(id: $pharmacyUpdateId, input: $input)\n  }\n": typeof types.PharmacyUpdateDocument;
  "\n  mutation PharmacyDelete($pharmacyDeleteId: String!) {\n    pharmacyDelete(id: $pharmacyDeleteId)\n  }\n": typeof types.PharmacyDeleteDocument;
  "\n  query PharmacyDetail($pharmacyDetailId: String!) {\n    pharmacyDetail(id: $pharmacyDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      inventoryCount\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n      inventory {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n        }\n      }\n    }\n  }\n": typeof types.PharmacyDetailDocument;
  "\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n": typeof types.UserCreateDocument;
  "\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n": typeof types.UserUpdateDocument;
  "\n  mutation MembershipUpdate(\n    $membershipUpdateId: String!\n    $input: MembershipUpdateInput!\n  ) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n": typeof types.MembershipUpdateDocument;
  "\n  mutation MembershipDelete($membershipDeleteId: String!) {\n    membershipDelete(id: $membershipDeleteId)\n  }\n": typeof types.MembershipDeleteDocument;
  "\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n": typeof types.MembershipsDocument;
  "\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n": typeof types.UserDetailDocument;
  "\n  mutation SupplyItemCreate($input: SupplyItemCreateInput!) {\n    supplyItemCreate(input: $input)\n  }\n": typeof types.SupplyItemCreateDocument;
  "\n  mutation SupplyItemUpdate($id: String!, $input: SupplyItemUpdateInput!) {\n    supplyItemUpdate(id: $id, input: $input)\n  }\n": typeof types.SupplyItemUpdateDocument;
  "\n  mutation SupplyItemDelete($id: String!) {\n    supplyItemDelete(id: $id)\n  }\n": typeof types.SupplyItemDeleteDocument;
  "\n  mutation SupplierCreate($input: SupplierCreateInput!) {\n    supplierCreate(input: $input)\n  }\n": typeof types.SupplierCreateDocument;
  "\n  mutation SupplierUpdate($id: String!, $input: SupplierUpdateInput!) {\n    supplierUpdate(id: $id, input: $input)\n  }\n": typeof types.SupplierUpdateDocument;
  "\n  mutation SupplierDelete($id: String!) {\n    supplierDelete(id: $id)\n  }\n": typeof types.SupplierDeleteDocument;
  "\n  query SupplyItems($take: Int!, $skip: Int!, $where: SupplyItemsWhereInput) {\n    supplyItems(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n": typeof types.SupplyItemsDocument;
  "\n  query SupplyItemDetail($supplyItemDetailId: String!) {\n    supplyItemDetail(id: $supplyItemDetailId) {\n      id\n      supplierId\n      name\n      shortDescription\n      description\n      category\n      model\n      brand\n      manufacturer\n      price\n      currency\n      availability\n      warranty\n      contactInfo\n      imageUrls\n      documentUrls\n      specifications\n      createdAt\n      updatedAt\n      supplier {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n": typeof types.SupplyItemDetailDocument;
  "\n  query Suppliers($take: Int!, $skip: Int!, $where: SuppliersWhereInput) {\n    suppliers(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n": typeof types.SuppliersDocument;
  "\n  query SupplierDetail($supplierDetailId: String!) {\n    supplierDetail(id: $supplierDetailId) {\n      id\n      organizationId\n      name\n      description\n      logoUrl\n      email\n      phone\n      website\n      status\n      categoriesSupplied\n      supplyItemCount\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n": typeof types.SupplierDetailDocument;
  "\n  query SupplierSupplyItems($supplierId: String!, $take: Int!, $skip: Int!) {\n    supplierSupplyItems(supplierId: $supplierId, take: $take, skip: $skip) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n": typeof types.SupplierSupplyItemsDocument;
};
const documents: Documents = {
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      message\n    }\n  }\n":
    types.SignUpDocument,
  "\n  mutation VerifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input) {\n      message\n    }\n  }\n":
    types.VerifyOtpDocument,
  "\n  mutation ResendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input) {\n      message\n    }\n  }\n":
    types.ResendOtpDocument,
  "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n":
    types.LogoutDocument,
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n":
    types.RefreshAccessTokenDocument,
  "\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n":
    types.SelectOrganizationDocument,
  "\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n":
    types.MeDocument,
  "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n":
    types.CurrentUserDocument,
  "\n  query DashboardOverview {\n    dashboardOverview {\n      role\n      admin {\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        growthSeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        recentItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        topHospitals {\n          label\n          value\n          helper\n          tone\n        }\n        topPharmacies {\n          label\n          value\n          helper\n          tone\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n        map {\n          hospitals {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n          drugstores {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n        }\n      }\n      hospital {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        equipmentStates {\n          label\n          value\n          helper\n          tone\n        }\n        recentLogs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        upcomingBookings {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        nearbyPharmacies {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n      pharmacy {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        topDrugs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        lowStockItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        recentUpdates {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n    }\n  }\n":
    types.DashboardOverviewDocument,
  "\n  query AdminMapLocations {\n    adminMapLocations {\n      hospitals {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n      drugstores {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n    }\n  }\n":
    types.AdminMapLocationsDocument,
  "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n":
    types.EquipmentCreateDocument,
  "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n":
    types.EquipmentUpdateDocument,
  "\n  mutation EquipmentDelete($equipmentDeleteId: String!) {\n    equipmentDelete(id: $equipmentDeleteId)\n  }\n":
    types.EquipmentDeleteDocument,
  "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        brand\n        model\n        manufacturedYear\n        commissionedDate\n        endOfLifeDate\n        passportDocument\n        usageManualDocument\n        calibrationInstructionDocument\n        maintenancePlan\n        requiredParts\n        usedParts\n        sparePartsStock\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n":
    types.EquipmentsDocument,
  "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      brand\n      model\n      manufacturedYear\n      commissionedDate\n      endOfLifeDate\n      passportDocument\n      usageManualDocument\n      calibrationInstructionDocument\n      maintenancePlan\n      requiredParts\n      usedParts\n      sparePartsStock\n      category\n      state\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      hospital {\n        id\n        name\n        email\n      }\n      logs {\n        id\n        description\n        type\n        faultDate\n        problem\n        repairAction\n        status\n        createdAt\n        performedBy {\n          id\n          name\n          email\n        }\n      }\n    }\n  }\n":
    types.EquipmentDetailDocument,
  "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n":
    types.HospitalCreateDocument,
  "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n":
    types.HospitalUpdateDocument,
  "\n  mutation HospitalDelete($hospitalDeleteId: String!) {\n    hospitalDelete(id: $hospitalDeleteId)\n  }\n":
    types.HospitalDeleteDocument,
  "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n":
    types.HospitalsDocument,
  "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n":
    types.HospitalDetailDocument,
  "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n":
    types.HospitalOptionDocument,
  "\n  mutation DrugCreate($input: DrugCreateInput!) {\n    drugCreate(input: $input)\n  }\n":
    types.DrugCreateDocument,
  "\n  mutation DrugUpdate($drugUpdateId: String!, $input: DrugCreateInput!) {\n    drugUpdate(id: $drugUpdateId, input: $input)\n  }\n":
    types.DrugUpdateDocument,
  "\n  mutation DrugDelete($id: String!) {\n    drugDelete(id: $id)\n  }\n":
    types.DrugDeleteDocument,
  "\n  mutation PharmacyDrugUpsert($input: PharmacyDrugUpsertInput!) {\n    pharmacyDrugUpsert(input: $input)\n  }\n":
    types.PharmacyDrugUpsertDocument,
  "\n  mutation PharmacyDrugDelete($drugId: String!) {\n    pharmacyDrugDelete(drugId: $drugId)\n  }\n":
    types.PharmacyDrugDeleteDocument,
  "\n  query Drugs($take: Int!, $skip: Int!, $where: DrugsWhereInput) {\n    drugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        genericName\n        dosageForm\n        strength\n        manufacturer\n        description\n        totalStock\n        startingPrice\n        availabilityCount\n        createdAt\n        updatedAt\n      }\n    }\n  }\n":
    types.DrugsDocument,
  "\n  query PharmacyDrugs(\n    $take: Int!\n    $skip: Int!\n    $where: PharmacyDrugsWhereInput\n  ) {\n    pharmacyDrugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n          description\n        }\n      }\n    }\n  }\n":
    types.PharmacyDrugsDocument,
  "\n  query DrugDetail($drugDetailId: String!) {\n    drugDetail(id: $drugDetailId) {\n      id\n      name\n      genericName\n      dosageForm\n      strength\n      manufacturer\n      description\n      totalStock\n      startingPrice\n      availabilityCount\n      createdAt\n      updatedAt\n      availability {\n        id\n        pharmacyId\n        organizationId\n        pharmacyName\n        pharmacyEmail\n        pharmacyPhone\n        quantity\n        price\n        status\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n":
    types.DrugDetailDocument,
  "\n  mutation PharmacyCreate($input: PharmacyCreateInput!) {\n    pharmacyCreate(input: $input)\n  }\n":
    types.PharmacyCreateDocument,
  "\n  mutation PharmacyUpdate(\n    $pharmacyUpdateId: String!\n    $input: PharmacyCreateInput!\n  ) {\n    pharmacyUpdate(id: $pharmacyUpdateId, input: $input)\n  }\n":
    types.PharmacyUpdateDocument,
  "\n  mutation PharmacyDelete($pharmacyDeleteId: String!) {\n    pharmacyDelete(id: $pharmacyDeleteId)\n  }\n":
    types.PharmacyDeleteDocument,
  "\n  query PharmacyDetail($pharmacyDetailId: String!) {\n    pharmacyDetail(id: $pharmacyDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      inventoryCount\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n      inventory {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n        }\n      }\n    }\n  }\n":
    types.PharmacyDetailDocument,
  "\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n":
    types.UserCreateDocument,
  "\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n":
    types.UserUpdateDocument,
  "\n  mutation MembershipUpdate(\n    $membershipUpdateId: String!\n    $input: MembershipUpdateInput!\n  ) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n":
    types.MembershipUpdateDocument,
  "\n  mutation MembershipDelete($membershipDeleteId: String!) {\n    membershipDelete(id: $membershipDeleteId)\n  }\n":
    types.MembershipDeleteDocument,
  "\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n":
    types.MembershipsDocument,
  "\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n":
    types.UserDetailDocument,
  "\n  mutation SupplyItemCreate($input: SupplyItemCreateInput!) {\n    supplyItemCreate(input: $input)\n  }\n":
    types.SupplyItemCreateDocument,
  "\n  mutation SupplyItemUpdate($id: String!, $input: SupplyItemUpdateInput!) {\n    supplyItemUpdate(id: $id, input: $input)\n  }\n":
    types.SupplyItemUpdateDocument,
  "\n  mutation SupplyItemDelete($id: String!) {\n    supplyItemDelete(id: $id)\n  }\n":
    types.SupplyItemDeleteDocument,
  "\n  mutation SupplierCreate($input: SupplierCreateInput!) {\n    supplierCreate(input: $input)\n  }\n":
    types.SupplierCreateDocument,
  "\n  mutation SupplierUpdate($id: String!, $input: SupplierUpdateInput!) {\n    supplierUpdate(id: $id, input: $input)\n  }\n":
    types.SupplierUpdateDocument,
  "\n  mutation SupplierDelete($id: String!) {\n    supplierDelete(id: $id)\n  }\n":
    types.SupplierDeleteDocument,
  "\n  query SupplyItems($take: Int!, $skip: Int!, $where: SupplyItemsWhereInput) {\n    supplyItems(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n":
    types.SupplyItemsDocument,
  "\n  query SupplyItemDetail($supplyItemDetailId: String!) {\n    supplyItemDetail(id: $supplyItemDetailId) {\n      id\n      supplierId\n      name\n      shortDescription\n      description\n      category\n      model\n      brand\n      manufacturer\n      price\n      currency\n      availability\n      warranty\n      contactInfo\n      imageUrls\n      documentUrls\n      specifications\n      createdAt\n      updatedAt\n      supplier {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n":
    types.SupplyItemDetailDocument,
  "\n  query Suppliers($take: Int!, $skip: Int!, $where: SuppliersWhereInput) {\n    suppliers(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n":
    types.SuppliersDocument,
  "\n  query SupplierDetail($supplierDetailId: String!) {\n    supplierDetail(id: $supplierDetailId) {\n      id\n      organizationId\n      name\n      description\n      logoUrl\n      email\n      phone\n      website\n      status\n      categoriesSupplied\n      supplyItemCount\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n":
    types.SupplierDetailDocument,
  "\n  query SupplierSupplyItems($supplierId: String!, $take: Int!, $skip: Int!) {\n    supplierSupplyItems(supplierId: $supplierId, take: $take, skip: $skip) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n":
    types.SupplierSupplyItemsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n",
): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation VerifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input) {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation VerifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation ResendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input) {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation ResendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation Logout {\n    logout {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n",
): (typeof documents)["\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query DashboardOverview {\n    dashboardOverview {\n      role\n      admin {\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        growthSeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        recentItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        topHospitals {\n          label\n          value\n          helper\n          tone\n        }\n        topPharmacies {\n          label\n          value\n          helper\n          tone\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n        map {\n          hospitals {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n          drugstores {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n        }\n      }\n      hospital {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        equipmentStates {\n          label\n          value\n          helper\n          tone\n        }\n        recentLogs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        upcomingBookings {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        nearbyPharmacies {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n      pharmacy {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        topDrugs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        lowStockItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        recentUpdates {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query DashboardOverview {\n    dashboardOverview {\n      role\n      admin {\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        growthSeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        recentItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        topHospitals {\n          label\n          value\n          helper\n          tone\n        }\n        topPharmacies {\n          label\n          value\n          helper\n          tone\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n        map {\n          hospitals {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n          drugstores {\n            id\n            name\n            type\n            address\n            address2\n            province\n            opensAt\n            closesAt\n            latitude\n            longitude\n          }\n        }\n      }\n      hospital {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        equipmentStates {\n          label\n          value\n          helper\n          tone\n        }\n        recentLogs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        upcomingBookings {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        nearbyPharmacies {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n      pharmacy {\n        profile {\n          id\n          name\n          email\n          phone\n          address\n          province\n          latitude\n          longitude\n        }\n        stats {\n          label\n          value\n          helper\n          tone\n        }\n        activitySeries {\n          key\n          label\n          color\n          points {\n            label\n            value\n          }\n        }\n        inventoryStatus {\n          label\n          value\n          helper\n          tone\n        }\n        topDrugs {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        lowStockItems {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        recentUpdates {\n          id\n          title\n          subtitle\n          meta\n          href\n          createdAt\n        }\n        alerts {\n          id\n          title\n          description\n          severity\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query AdminMapLocations {\n    adminMapLocations {\n      hospitals {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n      drugstores {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n    }\n  }\n",
): (typeof documents)["\n  query AdminMapLocations {\n    adminMapLocations {\n      hospitals {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n      drugstores {\n        id\n        name\n        type\n        address\n        address2\n        province\n        opensAt\n        closesAt\n        latitude\n        longitude\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation EquipmentDelete($equipmentDeleteId: String!) {\n    equipmentDelete(id: $equipmentDeleteId)\n  }\n",
): (typeof documents)["\n  mutation EquipmentDelete($equipmentDeleteId: String!) {\n    equipmentDelete(id: $equipmentDeleteId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        brand\n        model\n        manufacturedYear\n        commissionedDate\n        endOfLifeDate\n        passportDocument\n        usageManualDocument\n        calibrationInstructionDocument\n        maintenancePlan\n        requiredParts\n        usedParts\n        sparePartsStock\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n",
): (typeof documents)["\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        brand\n        model\n        manufacturedYear\n        commissionedDate\n        endOfLifeDate\n        passportDocument\n        usageManualDocument\n        calibrationInstructionDocument\n        maintenancePlan\n        requiredParts\n        usedParts\n        sparePartsStock\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      brand\n      model\n      manufacturedYear\n      commissionedDate\n      endOfLifeDate\n      passportDocument\n      usageManualDocument\n      calibrationInstructionDocument\n      maintenancePlan\n      requiredParts\n      usedParts\n      sparePartsStock\n      category\n      state\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      hospital {\n        id\n        name\n        email\n      }\n      logs {\n        id\n        description\n        type\n        faultDate\n        problem\n        repairAction\n        status\n        createdAt\n        performedBy {\n          id\n          name\n          email\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      brand\n      model\n      manufacturedYear\n      commissionedDate\n      endOfLifeDate\n      passportDocument\n      usageManualDocument\n      calibrationInstructionDocument\n      maintenancePlan\n      requiredParts\n      usedParts\n      sparePartsStock\n      category\n      state\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      hospital {\n        id\n        name\n        email\n      }\n      logs {\n        id\n        description\n        type\n        faultDate\n        problem\n        repairAction\n        status\n        createdAt\n        performedBy {\n          id\n          name\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation HospitalDelete($hospitalDeleteId: String!) {\n    hospitalDelete(id: $hospitalDeleteId)\n  }\n",
): (typeof documents)["\n  mutation HospitalDelete($hospitalDeleteId: String!) {\n    hospitalDelete(id: $hospitalDeleteId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n",
): (typeof documents)["\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DrugCreate($input: DrugCreateInput!) {\n    drugCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation DrugCreate($input: DrugCreateInput!) {\n    drugCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DrugUpdate($drugUpdateId: String!, $input: DrugCreateInput!) {\n    drugUpdate(id: $drugUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation DrugUpdate($drugUpdateId: String!, $input: DrugCreateInput!) {\n    drugUpdate(id: $drugUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DrugDelete($id: String!) {\n    drugDelete(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DrugDelete($id: String!) {\n    drugDelete(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation PharmacyDrugUpsert($input: PharmacyDrugUpsertInput!) {\n    pharmacyDrugUpsert(input: $input)\n  }\n",
): (typeof documents)["\n  mutation PharmacyDrugUpsert($input: PharmacyDrugUpsertInput!) {\n    pharmacyDrugUpsert(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation PharmacyDrugDelete($drugId: String!) {\n    pharmacyDrugDelete(drugId: $drugId)\n  }\n",
): (typeof documents)["\n  mutation PharmacyDrugDelete($drugId: String!) {\n    pharmacyDrugDelete(drugId: $drugId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Drugs($take: Int!, $skip: Int!, $where: DrugsWhereInput) {\n    drugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        genericName\n        dosageForm\n        strength\n        manufacturer\n        description\n        totalStock\n        startingPrice\n        availabilityCount\n        createdAt\n        updatedAt\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Drugs($take: Int!, $skip: Int!, $where: DrugsWhereInput) {\n    drugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        genericName\n        dosageForm\n        strength\n        manufacturer\n        description\n        totalStock\n        startingPrice\n        availabilityCount\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query PharmacyDrugs(\n    $take: Int!\n    $skip: Int!\n    $where: PharmacyDrugsWhereInput\n  ) {\n    pharmacyDrugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n          description\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query PharmacyDrugs(\n    $take: Int!\n    $skip: Int!\n    $where: PharmacyDrugsWhereInput\n  ) {\n    pharmacyDrugs(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n          description\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query DrugDetail($drugDetailId: String!) {\n    drugDetail(id: $drugDetailId) {\n      id\n      name\n      genericName\n      dosageForm\n      strength\n      manufacturer\n      description\n      totalStock\n      startingPrice\n      availabilityCount\n      createdAt\n      updatedAt\n      availability {\n        id\n        pharmacyId\n        organizationId\n        pharmacyName\n        pharmacyEmail\n        pharmacyPhone\n        quantity\n        price\n        status\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query DrugDetail($drugDetailId: String!) {\n    drugDetail(id: $drugDetailId) {\n      id\n      name\n      genericName\n      dosageForm\n      strength\n      manufacturer\n      description\n      totalStock\n      startingPrice\n      availabilityCount\n      createdAt\n      updatedAt\n      availability {\n        id\n        pharmacyId\n        organizationId\n        pharmacyName\n        pharmacyEmail\n        pharmacyPhone\n        quantity\n        price\n        status\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation PharmacyCreate($input: PharmacyCreateInput!) {\n    pharmacyCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation PharmacyCreate($input: PharmacyCreateInput!) {\n    pharmacyCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation PharmacyUpdate(\n    $pharmacyUpdateId: String!\n    $input: PharmacyCreateInput!\n  ) {\n    pharmacyUpdate(id: $pharmacyUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation PharmacyUpdate(\n    $pharmacyUpdateId: String!\n    $input: PharmacyCreateInput!\n  ) {\n    pharmacyUpdate(id: $pharmacyUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation PharmacyDelete($pharmacyDeleteId: String!) {\n    pharmacyDelete(id: $pharmacyDeleteId)\n  }\n",
): (typeof documents)["\n  mutation PharmacyDelete($pharmacyDeleteId: String!) {\n    pharmacyDelete(id: $pharmacyDeleteId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query PharmacyDetail($pharmacyDetailId: String!) {\n    pharmacyDetail(id: $pharmacyDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      inventoryCount\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n      inventory {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query PharmacyDetail($pharmacyDetailId: String!) {\n    pharmacyDetail(id: $pharmacyDetailId) {\n      id\n      name\n      email\n      phone\n      createdAt\n      updatedAt\n      inventoryCount\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n      inventory {\n        id\n        quantity\n        price\n        status\n        updatedAt\n        drug {\n          id\n          name\n          genericName\n          dosageForm\n          strength\n          manufacturer\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation MembershipUpdate(\n    $membershipUpdateId: String!\n    $input: MembershipUpdateInput!\n  ) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation MembershipUpdate(\n    $membershipUpdateId: String!\n    $input: MembershipUpdateInput!\n  ) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation MembershipDelete($membershipDeleteId: String!) {\n    membershipDelete(id: $membershipDeleteId)\n  }\n",
): (typeof documents)["\n  mutation MembershipDelete($membershipDeleteId: String!) {\n    membershipDelete(id: $membershipDeleteId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n",
): (typeof documents)["\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n",
): (typeof documents)["\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SupplyItemCreate($input: SupplyItemCreateInput!) {\n    supplyItemCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation SupplyItemCreate($input: SupplyItemCreateInput!) {\n    supplyItemCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SupplyItemUpdate($id: String!, $input: SupplyItemUpdateInput!) {\n    supplyItemUpdate(id: $id, input: $input)\n  }\n",
): (typeof documents)["\n  mutation SupplyItemUpdate($id: String!, $input: SupplyItemUpdateInput!) {\n    supplyItemUpdate(id: $id, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SupplyItemDelete($id: String!) {\n    supplyItemDelete(id: $id)\n  }\n",
): (typeof documents)["\n  mutation SupplyItemDelete($id: String!) {\n    supplyItemDelete(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SupplierCreate($input: SupplierCreateInput!) {\n    supplierCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation SupplierCreate($input: SupplierCreateInput!) {\n    supplierCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SupplierUpdate($id: String!, $input: SupplierUpdateInput!) {\n    supplierUpdate(id: $id, input: $input)\n  }\n",
): (typeof documents)["\n  mutation SupplierUpdate($id: String!, $input: SupplierUpdateInput!) {\n    supplierUpdate(id: $id, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SupplierDelete($id: String!) {\n    supplierDelete(id: $id)\n  }\n",
): (typeof documents)["\n  mutation SupplierDelete($id: String!) {\n    supplierDelete(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupplyItems($take: Int!, $skip: Int!, $where: SupplyItemsWhereInput) {\n    supplyItems(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupplyItems($take: Int!, $skip: Int!, $where: SupplyItemsWhereInput) {\n    supplyItems(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupplyItemDetail($supplyItemDetailId: String!) {\n    supplyItemDetail(id: $supplyItemDetailId) {\n      id\n      supplierId\n      name\n      shortDescription\n      description\n      category\n      model\n      brand\n      manufacturer\n      price\n      currency\n      availability\n      warranty\n      contactInfo\n      imageUrls\n      documentUrls\n      specifications\n      createdAt\n      updatedAt\n      supplier {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupplyItemDetail($supplyItemDetailId: String!) {\n    supplyItemDetail(id: $supplyItemDetailId) {\n      id\n      supplierId\n      name\n      shortDescription\n      description\n      category\n      model\n      brand\n      manufacturer\n      price\n      currency\n      availability\n      warranty\n      contactInfo\n      imageUrls\n      documentUrls\n      specifications\n      createdAt\n      updatedAt\n      supplier {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Suppliers($take: Int!, $skip: Int!, $where: SuppliersWhereInput) {\n    suppliers(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Suppliers($take: Int!, $skip: Int!, $where: SuppliersWhereInput) {\n    suppliers(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        organizationId\n        name\n        description\n        logoUrl\n        email\n        phone\n        website\n        status\n        categoriesSupplied\n        supplyItemCount\n        createdAt\n        updatedAt\n        address {\n          id\n          address1\n          address2\n          province\n          latitude\n          longitude\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupplierDetail($supplierDetailId: String!) {\n    supplierDetail(id: $supplierDetailId) {\n      id\n      organizationId\n      name\n      description\n      logoUrl\n      email\n      phone\n      website\n      status\n      categoriesSupplied\n      supplyItemCount\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupplierDetail($supplierDetailId: String!) {\n    supplierDetail(id: $supplierDetailId) {\n      id\n      organizationId\n      name\n      description\n      logoUrl\n      email\n      phone\n      website\n      status\n      categoriesSupplied\n      supplyItemCount\n      createdAt\n      updatedAt\n      address {\n        id\n        address1\n        address2\n        province\n        latitude\n        longitude\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupplierSupplyItems($supplierId: String!, $take: Int!, $skip: Int!) {\n    supplierSupplyItems(supplierId: $supplierId, take: $take, skip: $skip) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupplierSupplyItems($supplierId: String!, $take: Int!, $skip: Int!) {\n    supplierSupplyItems(supplierId: $supplierId, take: $take, skip: $skip) {\n      count\n      data {\n        id\n        supplierId\n        name\n        shortDescription\n        description\n        category\n        model\n        brand\n        manufacturer\n        price\n        currency\n        availability\n        warranty\n        contactInfo\n        imageUrls\n        documentUrls\n        specifications\n        createdAt\n        updatedAt\n        supplier {\n          id\n          organizationId\n          name\n          description\n          logoUrl\n          email\n          phone\n          website\n          status\n          categoriesSupplied\n          supplyItemCount\n          createdAt\n          updatedAt\n          address {\n            id\n            address1\n            address2\n            province\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
