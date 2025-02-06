export const VALID_WORKSHOP = ["wirebuzz"] as const;

export type WorkshopType = (typeof VALID_WORKSHOP)[number];

export const WORKSHOP_BANNER_SRC: Record<WorkshopType, string> = {
  wirebuzz: "/workshop/wirebuzz/6.jpg",
} as const;

export const WORKSHOP_SIGNUP_COUNTDOWN_DATE: Record<WorkshopType, Date> = {
  wirebuzz: new Date(`2025-02-06T22:36:00+07:00`),
} as const;
