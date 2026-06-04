import { gql } from "@apollo/client";

export const IMAGING_DEVICE_ANALYTICS = gql`
  query ImagingDeviceAnalytics($deviceSlug: String!, $period: String) {
    imagingDeviceAnalytics(deviceSlug: $deviceSlug, period: $period) {
      deviceSlug
      deviceId
      deviceName
      hospital
      department
      period
      stats {
        totalImages
        imagesPerHour
        imagesPerDay
        imagesPerWeek
        imagesPerMonth
        estimatedOperatingHours
        averageStudiesPerPatient
        utilizationPercentage
      }
      workload {
        hourly {
          label
          value
        }
        daily {
          label
          value
        }
        weekly {
          label
          value
        }
        monthly {
          label
          value
        }
        busiestHour
        busiestDay
        peakOperatingHours
        lowestOperatingHours
        underutilizedPeriods
      }
      health {
        level
        reasons
      }
      predictions {
        label
        riskScore
        riskLevel
        recommendation
      }
      recommendations
    }
  }
`;

export const PREDICTIVE_MAINTENANCE = gql`
  query PredictiveMaintenance {
    predictiveMaintenance {
      devices {
        deviceSlug
        deviceId
        deviceName
        hospital
        department
        period
        stats {
          totalImages
          estimatedOperatingHours
          utilizationPercentage
        }
        health {
          level
          reasons
        }
        predictions {
          label
          riskScore
          riskLevel
          recommendation
        }
        recommendations
      }
    }
  }
`;

export const GENERATE_ANALYTICS_REPORT = gql`
  mutation GenerateAnalyticsReport($deviceSlug: String!, $period: String) {
    generateAnalyticsReport(deviceSlug: $deviceSlug, period: $period) {
      id
      deviceName
      period
      fileName
      pdfBase64
      createdAt
    }
  }
`;
