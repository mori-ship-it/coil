export type JobType =
  | "stylist"
  | "colorist"
  | "assistant"
  | "nail"
  | "esthetician"
  | "manager"
  | "other";

export type Area =
  | "tokyo"
  | "osaka"
  | "kyoto"
  | "nagoya"
  | "fukuoka"
  | "sapporo"
  | "other";

export interface Salon {
  id: string;
  name: string;
  area: Area;
  address: string;
  /** 最寄駅（カード表示用） */
  nearestStation: string;
  jobTypes: JobType[];
  spotsAvailable: number;
  /** 即日スタート可 */
  sameDayOk: boolean;
  /** 週1〜可 */
  weeklyOk: boolean;
  /** 正社員 */
  fullTimeOk: boolean;
  /** 業務委託 */
  contractOk: boolean;
  /** 高時給 */
  highPayOk: boolean;
  /** 駅近 */
  stationNearbyOk: boolean;
  /** 時給/月給などの給与レンジ表示 */
  compensationLabel: string;
  description: string;
  photos: string[];
  featured?: boolean;
  createdAt: string;
}

export interface BeauticianForm {
  name: string;
  area: Area;
  jobType: JobType;
  instagram?: string;
  lineId?: string;
}

export interface SalonForm {
  salonName: string;
  ownerName: string;
  area: Area;
  address: string;
  jobTypes: JobType[];
  description: string;
  email: string;
  phone: string;
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  stylist: "スタイリスト",
  colorist: "カリスト",
  assistant: "アシスタント",
  nail: "ネイリスト",
  esthetician: "エステティシャン",
  manager: "マネージャー",
  other: "その他",
};

export const AREA_LABELS: Record<Area, string> = {
  tokyo: "東京",
  osaka: "大阪",
  kyoto: "京都",
  nagoya: "名古屋",
  fukuoka: "福岡",
  sapporo: "札幌",
  other: "その他",
};
