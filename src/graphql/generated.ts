import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  CountryJSON: any;
  Date: any;
  DateTime: any;
  GenericScalar: any;
  JSONString: any;
  SettingJSON: any;
  SocialCamelJSON: any;
  SystemInformationCamelJSON: any;
  UUID: any;
  Upload: any;
};

export type ApiMonitorObjectType = {
  __typename?: "APIMonitorObjectType";
  apiPublicKey: Scalars["String"];
  creator: RequestPasswordResetType;
  farm: FarmObjectType;
  id: Scalars["ID"];
  interval: Scalars["Int"];
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  retries: Scalars["Int"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
};

export type AccountAddressObjectType = {
  __typename?: "AccountAddressObjectType";
  address: Scalars["String"];
  city: Scalars["String"];
  country: CoreAccountAddressCountryChoices;
  id: Scalars["ID"];
  lat: Scalars["Float"];
  lon: Scalars["Float"];
  state: Scalars["String"];
  zipCode: Scalars["String"];
};

export type AccountInput = {
  address?: InputMaybe<AddressInput>;
  /** Avatar for the account. */
  avatar?: InputMaybe<Scalars["Upload"]>;
  billing?: InputMaybe<BillingInput>;
  currentLat?: InputMaybe<Scalars["Float"]>;
  currentLon?: InputMaybe<Scalars["Float"]>;
  dob?: InputMaybe<Scalars["Date"]>;
  fullName?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  oldPassword?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  setting?: InputMaybe<Scalars["JSONString"]>;
  twoFaViaEmail?: InputMaybe<Scalars["Boolean"]>;
  twoFaViaMobile?: InputMaybe<Scalars["Boolean"]>;
  twoFaViaTotp?: InputMaybe<Scalars["Boolean"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type AccountObjectType = {
  __typename?: "AccountObjectType";
  accountType?: Maybe<AccountType>;
  address?: Maybe<AccountAddressObjectType>;
  availblePlans?: Maybe<Array<Maybe<PlanObjectType>>>;
  avatar?: Maybe<Scalars["String"]>;
  billing?: Maybe<BillingObjectType>;
  /** Could create project: Owner and Admin and plan permission */
  canCreateProject?: Maybe<Scalars["Boolean"]>;
  /** current latitude of user */
  currentLat: Scalars["Float"];
  /** current longitude of user */
  currentLon: Scalars["Float"];
  dob?: Maybe<Scalars["Date"]>;
  email?: Maybe<Scalars["String"]>;
  firebaseToken?: Maybe<Scalars["String"]>;
  fullName: Scalars["String"];
  gender: CoreAccountGenderChoices;
  id: Scalars["ID"];
  inviations?: Maybe<Array<Maybe<InvitationObjectType>>>;
  isAccountApproved: Scalars["Boolean"];
  isCompleteProfile: Scalars["Boolean"];
  isEmailVerified: Scalars["Boolean"];
  isMobileVerified: Scalars["Boolean"];
  joinedProjects?: Maybe<Array<Maybe<ProjectObjectType>>>;
  lastLogin?: Maybe<Scalars["DateTime"]>;
  mobile?: Maybe<Scalars["String"]>;
  ownedProjects?: Maybe<Array<Maybe<ProjectObjectType>>>;
  setting?: Maybe<Scalars["SettingJSON"]>;
  socials?: Maybe<Array<Maybe<SocialObjectType>>>;
  subscription?: Maybe<SubscriptionObjectType>;
  twoFaViaEmail: Scalars["Boolean"];
  twoFaViaMobile: Scalars["Boolean"];
  twoFaViaTotp: Scalars["Boolean"];
  username: Scalars["String"];
};

export type AccountQueryUnionType =
  | AccountObjectType
  | NonePassAccountObjectType
  | OtpAccountObjectType;

/** An enumeration. */
export enum AccountType {
  Client = "CLIENT",
  Operator = "OPERATOR",
}

export type AccountUnionType =
  | AccountObjectType
  | NonePassAccountObjectType
  | OtpAccountObjectType
  | TwoFaAccountObjectType;

/**
 * Activate TOTP 2FA
 * Must input otp_token for sender (Use RequestOtp)
 *
 * Result:
 * ----------
 * Return token, and authpath with qr code
 */
export type ActivateTotp = {
  __typename?: "ActivateTOTP";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<TotpKeyObjectType>;
};

export type AddressInput = {
  address: Scalars["String"];
  city: Scalars["String"];
  country: Country;
  lat?: InputMaybe<Scalars["Float"]>;
  lon?: InputMaybe<Scalars["Float"]>;
  state: Scalars["String"];
  zipCode: Scalars["String"];
};

export type AssignZone = {
  __typename?: "AssignZone";
  code?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type AvailbleZone = {
  __typename?: "AvailbleZone";
  code: Scalars["String"];
  name: Scalars["String"];
};

export type BillingInput = {
  address: Scalars["String"];
  city: Scalars["String"];
  country: Country;
  lat?: InputMaybe<Scalars["Float"]>;
  lon?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  phone?: InputMaybe<Scalars["String"]>;
  state: Scalars["String"];
  taxId?: InputMaybe<Scalars["String"]>;
  zipCode: Scalars["String"];
};

export type BillingObjectType = {
  __typename?: "BillingObjectType";
  address: Scalars["String"];
  city: Scalars["String"];
  country: CoreBillingCountryChoices;
  name: Scalars["String"];
  phone?: Maybe<Scalars["String"]>;
  state: Scalars["String"];
  taxId?: Maybe<Scalars["String"]>;
  zipCode: Scalars["String"];
};

/** An enumeration. */
export enum CoreAccountAddressCountryChoices {
  /** Andorra */
  Ad = "AD",
  /** United Arab Emirates */
  Ae = "AE",
  /** Afghanistan */
  Af = "AF",
  /** Antigua and Barbuda */
  Ag = "AG",
  /** Anguilla */
  Ai = "AI",
  /** Albania */
  Al = "AL",
  /** Armenia */
  Am = "AM",
  /** Angola */
  Ao = "AO",
  /** Antarctica */
  Aq = "AQ",
  /** Argentina */
  Ar = "AR",
  /** American Samoa */
  As = "AS",
  /** Austria */
  At = "AT",
  /** Australia */
  Au = "AU",
  /** Aruba */
  Aw = "AW",
  /** Åland Islands */
  Ax = "AX",
  /** Azerbaijan */
  Az = "AZ",
  /** Bosnia and Herzegovina */
  Ba = "BA",
  /** Barbados */
  Bb = "BB",
  /** Bangladesh */
  Bd = "BD",
  /** Belgium */
  Be = "BE",
  /** Burkina Faso */
  Bf = "BF",
  /** Bulgaria */
  Bg = "BG",
  /** Bahrain */
  Bh = "BH",
  /** Burundi */
  Bi = "BI",
  /** Benin */
  Bj = "BJ",
  /** Saint Barthélemy */
  Bl = "BL",
  /** Bermuda */
  Bm = "BM",
  /** Brunei */
  Bn = "BN",
  /** Bolivia */
  Bo = "BO",
  /** Bonaire, Sint Eustatius and Saba */
  Bq = "BQ",
  /** Brazil */
  Br = "BR",
  /** Bahamas */
  Bs = "BS",
  /** Bhutan */
  Bt = "BT",
  /** Bouvet Island */
  Bv = "BV",
  /** Botswana */
  Bw = "BW",
  /** Belarus */
  By = "BY",
  /** Belize */
  Bz = "BZ",
  /** Canada */
  Ca = "CA",
  /** Cocos (Keeling) Islands */
  Cc = "CC",
  /** Congo (the Democratic Republic of the) */
  Cd = "CD",
  /** Central African Republic */
  Cf = "CF",
  /** Congo */
  Cg = "CG",
  /** Switzerland */
  Ch = "CH",
  /** Côte d'Ivoire */
  Ci = "CI",
  /** Cook Islands */
  Ck = "CK",
  /** Chile */
  Cl = "CL",
  /** Cameroon */
  Cm = "CM",
  /** China */
  Cn = "CN",
  /** Colombia */
  Co = "CO",
  /** Costa Rica */
  Cr = "CR",
  /** Cuba */
  Cu = "CU",
  /** Cabo Verde */
  Cv = "CV",
  /** Curaçao */
  Cw = "CW",
  /** Christmas Island */
  Cx = "CX",
  /** Cyprus */
  Cy = "CY",
  /** Czechia */
  Cz = "CZ",
  /** Germany */
  De = "DE",
  /** Djibouti */
  Dj = "DJ",
  /** Denmark */
  Dk = "DK",
  /** Dominica */
  Dm = "DM",
  /** Dominican Republic */
  Do = "DO",
  /** Algeria */
  Dz = "DZ",
  /** Ecuador */
  Ec = "EC",
  /** Estonia */
  Ee = "EE",
  /** Egypt */
  Eg = "EG",
  /** Western Sahara */
  Eh = "EH",
  /** Eritrea */
  Er = "ER",
  /** Spain */
  Es = "ES",
  /** Ethiopia */
  Et = "ET",
  /** Finland */
  Fi = "FI",
  /** Fiji */
  Fj = "FJ",
  /** Falkland Islands (Malvinas) */
  Fk = "FK",
  /** Micronesia (Federated States of) */
  Fm = "FM",
  /** Faroe Islands */
  Fo = "FO",
  /** France */
  Fr = "FR",
  /** Gabon */
  Ga = "GA",
  /** United Kingdom */
  Gb = "GB",
  /** Grenada */
  Gd = "GD",
  /** Georgia */
  Ge = "GE",
  /** French Guiana */
  Gf = "GF",
  /** Guernsey */
  Gg = "GG",
  /** Ghana */
  Gh = "GH",
  /** Gibraltar */
  Gi = "GI",
  /** Greenland */
  Gl = "GL",
  /** Gambia */
  Gm = "GM",
  /** Guinea */
  Gn = "GN",
  /** Guadeloupe */
  Gp = "GP",
  /** Equatorial Guinea */
  Gq = "GQ",
  /** Greece */
  Gr = "GR",
  /** South Georgia and the South Sandwich Islands */
  Gs = "GS",
  /** Guatemala */
  Gt = "GT",
  /** Guam */
  Gu = "GU",
  /** Guinea-Bissau */
  Gw = "GW",
  /** Guyana */
  Gy = "GY",
  /** Hong Kong */
  Hk = "HK",
  /** Heard Island and McDonald Islands */
  Hm = "HM",
  /** Honduras */
  Hn = "HN",
  /** Croatia */
  Hr = "HR",
  /** Haiti */
  Ht = "HT",
  /** Hungary */
  Hu = "HU",
  /** Indonesia */
  Id = "ID",
  /** Ireland */
  Ie = "IE",
  /** Israel */
  Il = "IL",
  /** Isle of Man */
  Im = "IM",
  /** India */
  In = "IN",
  /** British Indian Ocean Territory */
  Io = "IO",
  /** Iraq */
  Iq = "IQ",
  /** Iran */
  Ir = "IR",
  /** Iceland */
  Is = "IS",
  /** Italy */
  It = "IT",
  /** Jersey */
  Je = "JE",
  /** Jamaica */
  Jm = "JM",
  /** Jordan */
  Jo = "JO",
  /** Japan */
  Jp = "JP",
  /** Kenya */
  Ke = "KE",
  /** Kyrgyzstan */
  Kg = "KG",
  /** Cambodia */
  Kh = "KH",
  /** Kiribati */
  Ki = "KI",
  /** Comoros */
  Km = "KM",
  /** Saint Kitts and Nevis */
  Kn = "KN",
  /** North Korea */
  Kp = "KP",
  /** South Korea */
  Kr = "KR",
  /** Kuwait */
  Kw = "KW",
  /** Cayman Islands */
  Ky = "KY",
  /** Kazakhstan */
  Kz = "KZ",
  /** Laos */
  La = "LA",
  /** Lebanon */
  Lb = "LB",
  /** Saint Lucia */
  Lc = "LC",
  /** Liechtenstein */
  Li = "LI",
  /** Sri Lanka */
  Lk = "LK",
  /** Liberia */
  Lr = "LR",
  /** Lesotho */
  Ls = "LS",
  /** Lithuania */
  Lt = "LT",
  /** Luxembourg */
  Lu = "LU",
  /** Latvia */
  Lv = "LV",
  /** Libya */
  Ly = "LY",
  /** Morocco */
  Ma = "MA",
  /** Monaco */
  Mc = "MC",
  /** Moldova */
  Md = "MD",
  /** Montenegro */
  Me = "ME",
  /** Saint Martin (French part) */
  Mf = "MF",
  /** Madagascar */
  Mg = "MG",
  /** Marshall Islands */
  Mh = "MH",
  /** North Macedonia */
  Mk = "MK",
  /** Mali */
  Ml = "ML",
  /** Myanmar */
  Mm = "MM",
  /** Mongolia */
  Mn = "MN",
  /** Macao */
  Mo = "MO",
  /** Northern Mariana Islands */
  Mp = "MP",
  /** Martinique */
  Mq = "MQ",
  /** Mauritania */
  Mr = "MR",
  /** Montserrat */
  Ms = "MS",
  /** Malta */
  Mt = "MT",
  /** Mauritius */
  Mu = "MU",
  /** Maldives */
  Mv = "MV",
  /** Malawi */
  Mw = "MW",
  /** Mexico */
  Mx = "MX",
  /** Malaysia */
  My = "MY",
  /** Mozambique */
  Mz = "MZ",
  /** Namibia */
  Na = "NA",
  /** New Caledonia */
  Nc = "NC",
  /** Niger */
  Ne = "NE",
  /** Norfolk Island */
  Nf = "NF",
  /** Nigeria */
  Ng = "NG",
  /** Nicaragua */
  Ni = "NI",
  /** Netherlands */
  Nl = "NL",
  /** Norway */
  No = "NO",
  /** Nepal */
  Np = "NP",
  /** Nauru */
  Nr = "NR",
  /** Niue */
  Nu = "NU",
  /** New Zealand */
  Nz = "NZ",
  /** Oman */
  Om = "OM",
  /** Panama */
  Pa = "PA",
  /** Peru */
  Pe = "PE",
  /** French Polynesia */
  Pf = "PF",
  /** Papua New Guinea */
  Pg = "PG",
  /** Philippines */
  Ph = "PH",
  /** Pakistan */
  Pk = "PK",
  /** Poland */
  Pl = "PL",
  /** Saint Pierre and Miquelon */
  Pm = "PM",
  /** Pitcairn */
  Pn = "PN",
  /** Puerto Rico */
  Pr = "PR",
  /** Palestine, State of */
  Ps = "PS",
  /** Portugal */
  Pt = "PT",
  /** Palau */
  Pw = "PW",
  /** Paraguay */
  Py = "PY",
  /** Qatar */
  Qa = "QA",
  /** Réunion */
  Re = "RE",
  /** Romania */
  Ro = "RO",
  /** Serbia */
  Rs = "RS",
  /** Russia */
  Ru = "RU",
  /** Rwanda */
  Rw = "RW",
  /** Saudi Arabia */
  Sa = "SA",
  /** Solomon Islands */
  Sb = "SB",
  /** Seychelles */
  Sc = "SC",
  /** Sudan */
  Sd = "SD",
  /** Sweden */
  Se = "SE",
  /** Singapore */
  Sg = "SG",
  /** Saint Helena, Ascension and Tristan da Cunha */
  Sh = "SH",
  /** Slovenia */
  Si = "SI",
  /** Svalbard and Jan Mayen */
  Sj = "SJ",
  /** Slovakia */
  Sk = "SK",
  /** Sierra Leone */
  Sl = "SL",
  /** San Marino */
  Sm = "SM",
  /** Senegal */
  Sn = "SN",
  /** Somalia */
  So = "SO",
  /** Suriname */
  Sr = "SR",
  /** South Sudan */
  Ss = "SS",
  /** Sao Tome and Principe */
  St = "ST",
  /** El Salvador */
  Sv = "SV",
  /** Sint Maarten (Dutch part) */
  Sx = "SX",
  /** Syria */
  Sy = "SY",
  /** Eswatini */
  Sz = "SZ",
  /** Turks and Caicos Islands */
  Tc = "TC",
  /** Chad */
  Td = "TD",
  /** French Southern Territories */
  Tf = "TF",
  /** Togo */
  Tg = "TG",
  /** Thailand */
  Th = "TH",
  /** Tajikistan */
  Tj = "TJ",
  /** Tokelau */
  Tk = "TK",
  /** Timor-Leste */
  Tl = "TL",
  /** Turkmenistan */
  Tm = "TM",
  /** Tunisia */
  Tn = "TN",
  /** Tonga */
  To = "TO",
  /** Türkiye */
  Tr = "TR",
  /** Trinidad and Tobago */
  Tt = "TT",
  /** Tuvalu */
  Tv = "TV",
  /** Taiwan */
  Tw = "TW",
  /** Tanzania */
  Tz = "TZ",
  /** Ukraine */
  Ua = "UA",
  /** Uganda */
  Ug = "UG",
  /** United States Minor Outlying Islands */
  Um = "UM",
  /** United States of America */
  Us = "US",
  /** Uruguay */
  Uy = "UY",
  /** Uzbekistan */
  Uz = "UZ",
  /** Holy See */
  Va = "VA",
  /** Saint Vincent and the Grenadines */
  Vc = "VC",
  /** Venezuela */
  Ve = "VE",
  /** Virgin Islands (British) */
  Vg = "VG",
  /** Virgin Islands (U.S.) */
  Vi = "VI",
  /** Vietnam */
  Vn = "VN",
  /** Vanuatu */
  Vu = "VU",
  /** Wallis and Futuna */
  Wf = "WF",
  /** Samoa */
  Ws = "WS",
  /** Yemen */
  Ye = "YE",
  /** Mayotte */
  Yt = "YT",
  /** South Africa */
  Za = "ZA",
  /** Zambia */
  Zm = "ZM",
  /** Zimbabwe */
  Zw = "ZW",
}

/** An enumeration. */
export enum CoreAccountGenderChoices {
  /** Female */
  Female = "FEMALE",
  /** Male */
  Male = "MALE",
  /** Other */
  Other = "OTHER",
}

/** An enumeration. */
export enum CoreBillingCountryChoices {
  /** Andorra */
  Ad = "AD",
  /** United Arab Emirates */
  Ae = "AE",
  /** Afghanistan */
  Af = "AF",
  /** Antigua and Barbuda */
  Ag = "AG",
  /** Anguilla */
  Ai = "AI",
  /** Albania */
  Al = "AL",
  /** Armenia */
  Am = "AM",
  /** Angola */
  Ao = "AO",
  /** Antarctica */
  Aq = "AQ",
  /** Argentina */
  Ar = "AR",
  /** American Samoa */
  As = "AS",
  /** Austria */
  At = "AT",
  /** Australia */
  Au = "AU",
  /** Aruba */
  Aw = "AW",
  /** Åland Islands */
  Ax = "AX",
  /** Azerbaijan */
  Az = "AZ",
  /** Bosnia and Herzegovina */
  Ba = "BA",
  /** Barbados */
  Bb = "BB",
  /** Bangladesh */
  Bd = "BD",
  /** Belgium */
  Be = "BE",
  /** Burkina Faso */
  Bf = "BF",
  /** Bulgaria */
  Bg = "BG",
  /** Bahrain */
  Bh = "BH",
  /** Burundi */
  Bi = "BI",
  /** Benin */
  Bj = "BJ",
  /** Saint Barthélemy */
  Bl = "BL",
  /** Bermuda */
  Bm = "BM",
  /** Brunei */
  Bn = "BN",
  /** Bolivia */
  Bo = "BO",
  /** Bonaire, Sint Eustatius and Saba */
  Bq = "BQ",
  /** Brazil */
  Br = "BR",
  /** Bahamas */
  Bs = "BS",
  /** Bhutan */
  Bt = "BT",
  /** Bouvet Island */
  Bv = "BV",
  /** Botswana */
  Bw = "BW",
  /** Belarus */
  By = "BY",
  /** Belize */
  Bz = "BZ",
  /** Canada */
  Ca = "CA",
  /** Cocos (Keeling) Islands */
  Cc = "CC",
  /** Congo (the Democratic Republic of the) */
  Cd = "CD",
  /** Central African Republic */
  Cf = "CF",
  /** Congo */
  Cg = "CG",
  /** Switzerland */
  Ch = "CH",
  /** Côte d'Ivoire */
  Ci = "CI",
  /** Cook Islands */
  Ck = "CK",
  /** Chile */
  Cl = "CL",
  /** Cameroon */
  Cm = "CM",
  /** China */
  Cn = "CN",
  /** Colombia */
  Co = "CO",
  /** Costa Rica */
  Cr = "CR",
  /** Cuba */
  Cu = "CU",
  /** Cabo Verde */
  Cv = "CV",
  /** Curaçao */
  Cw = "CW",
  /** Christmas Island */
  Cx = "CX",
  /** Cyprus */
  Cy = "CY",
  /** Czechia */
  Cz = "CZ",
  /** Germany */
  De = "DE",
  /** Djibouti */
  Dj = "DJ",
  /** Denmark */
  Dk = "DK",
  /** Dominica */
  Dm = "DM",
  /** Dominican Republic */
  Do = "DO",
  /** Algeria */
  Dz = "DZ",
  /** Ecuador */
  Ec = "EC",
  /** Estonia */
  Ee = "EE",
  /** Egypt */
  Eg = "EG",
  /** Western Sahara */
  Eh = "EH",
  /** Eritrea */
  Er = "ER",
  /** Spain */
  Es = "ES",
  /** Ethiopia */
  Et = "ET",
  /** Finland */
  Fi = "FI",
  /** Fiji */
  Fj = "FJ",
  /** Falkland Islands (Malvinas) */
  Fk = "FK",
  /** Micronesia (Federated States of) */
  Fm = "FM",
  /** Faroe Islands */
  Fo = "FO",
  /** France */
  Fr = "FR",
  /** Gabon */
  Ga = "GA",
  /** United Kingdom */
  Gb = "GB",
  /** Grenada */
  Gd = "GD",
  /** Georgia */
  Ge = "GE",
  /** French Guiana */
  Gf = "GF",
  /** Guernsey */
  Gg = "GG",
  /** Ghana */
  Gh = "GH",
  /** Gibraltar */
  Gi = "GI",
  /** Greenland */
  Gl = "GL",
  /** Gambia */
  Gm = "GM",
  /** Guinea */
  Gn = "GN",
  /** Guadeloupe */
  Gp = "GP",
  /** Equatorial Guinea */
  Gq = "GQ",
  /** Greece */
  Gr = "GR",
  /** South Georgia and the South Sandwich Islands */
  Gs = "GS",
  /** Guatemala */
  Gt = "GT",
  /** Guam */
  Gu = "GU",
  /** Guinea-Bissau */
  Gw = "GW",
  /** Guyana */
  Gy = "GY",
  /** Hong Kong */
  Hk = "HK",
  /** Heard Island and McDonald Islands */
  Hm = "HM",
  /** Honduras */
  Hn = "HN",
  /** Croatia */
  Hr = "HR",
  /** Haiti */
  Ht = "HT",
  /** Hungary */
  Hu = "HU",
  /** Indonesia */
  Id = "ID",
  /** Ireland */
  Ie = "IE",
  /** Israel */
  Il = "IL",
  /** Isle of Man */
  Im = "IM",
  /** India */
  In = "IN",
  /** British Indian Ocean Territory */
  Io = "IO",
  /** Iraq */
  Iq = "IQ",
  /** Iran */
  Ir = "IR",
  /** Iceland */
  Is = "IS",
  /** Italy */
  It = "IT",
  /** Jersey */
  Je = "JE",
  /** Jamaica */
  Jm = "JM",
  /** Jordan */
  Jo = "JO",
  /** Japan */
  Jp = "JP",
  /** Kenya */
  Ke = "KE",
  /** Kyrgyzstan */
  Kg = "KG",
  /** Cambodia */
  Kh = "KH",
  /** Kiribati */
  Ki = "KI",
  /** Comoros */
  Km = "KM",
  /** Saint Kitts and Nevis */
  Kn = "KN",
  /** North Korea */
  Kp = "KP",
  /** South Korea */
  Kr = "KR",
  /** Kuwait */
  Kw = "KW",
  /** Cayman Islands */
  Ky = "KY",
  /** Kazakhstan */
  Kz = "KZ",
  /** Laos */
  La = "LA",
  /** Lebanon */
  Lb = "LB",
  /** Saint Lucia */
  Lc = "LC",
  /** Liechtenstein */
  Li = "LI",
  /** Sri Lanka */
  Lk = "LK",
  /** Liberia */
  Lr = "LR",
  /** Lesotho */
  Ls = "LS",
  /** Lithuania */
  Lt = "LT",
  /** Luxembourg */
  Lu = "LU",
  /** Latvia */
  Lv = "LV",
  /** Libya */
  Ly = "LY",
  /** Morocco */
  Ma = "MA",
  /** Monaco */
  Mc = "MC",
  /** Moldova */
  Md = "MD",
  /** Montenegro */
  Me = "ME",
  /** Saint Martin (French part) */
  Mf = "MF",
  /** Madagascar */
  Mg = "MG",
  /** Marshall Islands */
  Mh = "MH",
  /** North Macedonia */
  Mk = "MK",
  /** Mali */
  Ml = "ML",
  /** Myanmar */
  Mm = "MM",
  /** Mongolia */
  Mn = "MN",
  /** Macao */
  Mo = "MO",
  /** Northern Mariana Islands */
  Mp = "MP",
  /** Martinique */
  Mq = "MQ",
  /** Mauritania */
  Mr = "MR",
  /** Montserrat */
  Ms = "MS",
  /** Malta */
  Mt = "MT",
  /** Mauritius */
  Mu = "MU",
  /** Maldives */
  Mv = "MV",
  /** Malawi */
  Mw = "MW",
  /** Mexico */
  Mx = "MX",
  /** Malaysia */
  My = "MY",
  /** Mozambique */
  Mz = "MZ",
  /** Namibia */
  Na = "NA",
  /** New Caledonia */
  Nc = "NC",
  /** Niger */
  Ne = "NE",
  /** Norfolk Island */
  Nf = "NF",
  /** Nigeria */
  Ng = "NG",
  /** Nicaragua */
  Ni = "NI",
  /** Netherlands */
  Nl = "NL",
  /** Norway */
  No = "NO",
  /** Nepal */
  Np = "NP",
  /** Nauru */
  Nr = "NR",
  /** Niue */
  Nu = "NU",
  /** New Zealand */
  Nz = "NZ",
  /** Oman */
  Om = "OM",
  /** Panama */
  Pa = "PA",
  /** Peru */
  Pe = "PE",
  /** French Polynesia */
  Pf = "PF",
  /** Papua New Guinea */
  Pg = "PG",
  /** Philippines */
  Ph = "PH",
  /** Pakistan */
  Pk = "PK",
  /** Poland */
  Pl = "PL",
  /** Saint Pierre and Miquelon */
  Pm = "PM",
  /** Pitcairn */
  Pn = "PN",
  /** Puerto Rico */
  Pr = "PR",
  /** Palestine, State of */
  Ps = "PS",
  /** Portugal */
  Pt = "PT",
  /** Palau */
  Pw = "PW",
  /** Paraguay */
  Py = "PY",
  /** Qatar */
  Qa = "QA",
  /** Réunion */
  Re = "RE",
  /** Romania */
  Ro = "RO",
  /** Serbia */
  Rs = "RS",
  /** Russia */
  Ru = "RU",
  /** Rwanda */
  Rw = "RW",
  /** Saudi Arabia */
  Sa = "SA",
  /** Solomon Islands */
  Sb = "SB",
  /** Seychelles */
  Sc = "SC",
  /** Sudan */
  Sd = "SD",
  /** Sweden */
  Se = "SE",
  /** Singapore */
  Sg = "SG",
  /** Saint Helena, Ascension and Tristan da Cunha */
  Sh = "SH",
  /** Slovenia */
  Si = "SI",
  /** Svalbard and Jan Mayen */
  Sj = "SJ",
  /** Slovakia */
  Sk = "SK",
  /** Sierra Leone */
  Sl = "SL",
  /** San Marino */
  Sm = "SM",
  /** Senegal */
  Sn = "SN",
  /** Somalia */
  So = "SO",
  /** Suriname */
  Sr = "SR",
  /** South Sudan */
  Ss = "SS",
  /** Sao Tome and Principe */
  St = "ST",
  /** El Salvador */
  Sv = "SV",
  /** Sint Maarten (Dutch part) */
  Sx = "SX",
  /** Syria */
  Sy = "SY",
  /** Eswatini */
  Sz = "SZ",
  /** Turks and Caicos Islands */
  Tc = "TC",
  /** Chad */
  Td = "TD",
  /** French Southern Territories */
  Tf = "TF",
  /** Togo */
  Tg = "TG",
  /** Thailand */
  Th = "TH",
  /** Tajikistan */
  Tj = "TJ",
  /** Tokelau */
  Tk = "TK",
  /** Timor-Leste */
  Tl = "TL",
  /** Turkmenistan */
  Tm = "TM",
  /** Tunisia */
  Tn = "TN",
  /** Tonga */
  To = "TO",
  /** Türkiye */
  Tr = "TR",
  /** Trinidad and Tobago */
  Tt = "TT",
  /** Tuvalu */
  Tv = "TV",
  /** Taiwan */
  Tw = "TW",
  /** Tanzania */
  Tz = "TZ",
  /** Ukraine */
  Ua = "UA",
  /** Uganda */
  Ug = "UG",
  /** United States Minor Outlying Islands */
  Um = "UM",
  /** United States of America */
  Us = "US",
  /** Uruguay */
  Uy = "UY",
  /** Uzbekistan */
  Uz = "UZ",
  /** Holy See */
  Va = "VA",
  /** Saint Vincent and the Grenadines */
  Vc = "VC",
  /** Venezuela */
  Ve = "VE",
  /** Virgin Islands (British) */
  Vg = "VG",
  /** Virgin Islands (U.S.) */
  Vi = "VI",
  /** Vietnam */
  Vn = "VN",
  /** Vanuatu */
  Vu = "VU",
  /** Wallis and Futuna */
  Wf = "WF",
  /** Samoa */
  Ws = "WS",
  /** Yemen */
  Ye = "YE",
  /** Mayotte */
  Yt = "YT",
  /** South Africa */
  Za = "ZA",
  /** Zambia */
  Zm = "ZM",
  /** Zimbabwe */
  Zw = "ZW",
}

/** An enumeration. */
export enum CoreReceiptPaymentMethodChoices {
  /** failed */
  Failure = "FAILURE",
  /** initial */
  Initial = "INITIAL",
  /** processing */
  Processing = "PROCESSING",
  /** refound completed */
  RefoundComplete = "REFOUND_COMPLETE",
  /** refound request */
  RefoundRequest = "REFOUND_REQUEST",
  /** success */
  Success = "SUCCESS",
}

/** An enumeration. */
export enum CoreReceiptStatusChoices {
  /** google pay */
  GooglePay = "GOOGLE_PAY",
  /** paypal */
  Paypal = "PAYPAL",
}

/** An enumeration. */
export enum CoreSubscriptionStatusChoices {
  /** active */
  Active = "ACTIVE",
  /** failed payment */
  FailurePayment = "FAILURE_PAYMENT",
  /** retry failed payment */
  RetryFailurePayment = "RETRY_FAILURE_PAYMENT",
  /** suspend */
  Suspend = "SUSPEND",
}

/** An enumeration. */
export enum Country {
  Ad = "AD",
  Ae = "AE",
  Ag = "AG",
  Ai = "AI",
  Al = "AL",
  Am = "AM",
  Ao = "AO",
  Aq = "AQ",
  Ar = "AR",
  As = "AS",
  At = "AT",
  Au = "AU",
  Aw = "AW",
  Ax = "AX",
  Az = "AZ",
  Ba = "BA",
  Bb = "BB",
  Bd = "BD",
  Be = "BE",
  Bf = "BF",
  Bg = "BG",
  Bh = "BH",
  Bi = "BI",
  Bj = "BJ",
  Bl = "BL",
  Bm = "BM",
  Bn = "BN",
  Bo = "BO",
  Bq = "BQ",
  Br = "BR",
  Bs = "BS",
  Bt = "BT",
  Bv = "BV",
  Bw = "BW",
  By = "BY",
  Bz = "BZ",
  Ca = "CA",
  Cc = "CC",
  Cd = "CD",
  Cf = "CF",
  Cg = "CG",
  Ch = "CH",
  Ci = "CI",
  Ck = "CK",
  Cl = "CL",
  Cm = "CM",
  Cn = "CN",
  Co = "CO",
  Cr = "CR",
  Cu = "CU",
  Cv = "CV",
  Cw = "CW",
  Cx = "CX",
  Cy = "CY",
  Cz = "CZ",
  De = "DE",
  Dj = "DJ",
  Dk = "DK",
  Dm = "DM",
  Do = "DO",
  Dz = "DZ",
  Ec = "EC",
  Ee = "EE",
  Eg = "EG",
  Eh = "EH",
  Er = "ER",
  Es = "ES",
  Et = "ET",
  Fi = "FI",
  Fj = "FJ",
  Fk = "FK",
  Fm = "FM",
  Fo = "FO",
  Fr = "FR",
  Ga = "GA",
  Gb = "GB",
  Gd = "GD",
  Ge = "GE",
  Gf = "GF",
  Gg = "GG",
  Gh = "GH",
  Gi = "GI",
  Gl = "GL",
  Gm = "GM",
  Gn = "GN",
  Gp = "GP",
  Gq = "GQ",
  Gr = "GR",
  Gs = "GS",
  Gt = "GT",
  Gu = "GU",
  Gw = "GW",
  Gy = "GY",
  Hk = "HK",
  Hm = "HM",
  Hn = "HN",
  Hr = "HR",
  Ht = "HT",
  Hu = "HU",
  Id = "ID",
  Ie = "IE",
  Il = "IL",
  Im = "IM",
  In = "IN",
  Io = "IO",
  Iq = "IQ",
  Ir = "IR",
  Is = "IS",
  It = "IT",
  Je = "JE",
  Jm = "JM",
  Jo = "JO",
  Jp = "JP",
  Ke = "KE",
  Kg = "KG",
  Kh = "KH",
  Ki = "KI",
  Km = "KM",
  Kn = "KN",
  Kp = "KP",
  Kr = "KR",
  Kw = "KW",
  Ky = "KY",
  Kz = "KZ",
  La = "LA",
  Lb = "LB",
  Lc = "LC",
  Li = "LI",
  Lk = "LK",
  Lr = "LR",
  Ls = "LS",
  Lt = "LT",
  Lu = "LU",
  Lv = "LV",
  Ly = "LY",
  Ma = "MA",
  Mc = "MC",
  Md = "MD",
  Me = "ME",
  Mf = "MF",
  Mg = "MG",
  Mh = "MH",
  Mk = "MK",
  Ml = "ML",
  Mm = "MM",
  Mn = "MN",
  Mo = "MO",
  Mp = "MP",
  Mq = "MQ",
  Mr = "MR",
  Ms = "MS",
  Mt = "MT",
  Mu = "MU",
  Mv = "MV",
  Mw = "MW",
  Mx = "MX",
  My = "MY",
  Mz = "MZ",
  Na = "NA",
  Nc = "NC",
  Ne = "NE",
  Nf = "NF",
  Ng = "NG",
  Ni = "NI",
  Nl = "NL",
  No = "NO",
  Np = "NP",
  Nr = "NR",
  Nu = "NU",
  Nz = "NZ",
  Om = "OM",
  Pa = "PA",
  Pe = "PE",
  Pf = "PF",
  Pg = "PG",
  Ph = "PH",
  Pk = "PK",
  Pl = "PL",
  Pm = "PM",
  Pn = "PN",
  Pr = "PR",
  Ps = "PS",
  Pt = "PT",
  Pw = "PW",
  Py = "PY",
  Qa = "QA",
  Re = "RE",
  Ro = "RO",
  Rs = "RS",
  Ru = "RU",
  Rw = "RW",
  Sa = "SA",
  Sb = "SB",
  Sc = "SC",
  Sd = "SD",
  Se = "SE",
  Sg = "SG",
  Sh = "SH",
  Si = "SI",
  Sj = "SJ",
  Sk = "SK",
  Sl = "SL",
  Sm = "SM",
  Sn = "SN",
  So = "SO",
  Sr = "SR",
  Ss = "SS",
  St = "ST",
  Sv = "SV",
  Sx = "SX",
  Sy = "SY",
  Sz = "SZ",
  Tc = "TC",
  Td = "TD",
  Tf = "TF",
  Tg = "TG",
  Th = "TH",
  Tj = "TJ",
  Tk = "TK",
  Tl = "TL",
  Tm = "TM",
  Tn = "TN",
  To = "TO",
  Tr = "TR",
  Tt = "TT",
  Tv = "TV",
  Tw = "TW",
  Tz = "TZ",
  Ua = "UA",
  Ug = "UG",
  Um = "UM",
  Us = "US",
  Uy = "UY",
  Uz = "UZ",
  Va = "VA",
  Vc = "VC",
  Ve = "VE",
  Vg = "VG",
  Vi = "VI",
  Vn = "VN",
  Vu = "VU",
  Wf = "WF",
  Ws = "WS",
  Ye = "YE",
  Yt = "YT",
  Za = "ZA",
  Zm = "ZM",
  Zw = "ZW",
}

/**
 * Register an account with full name, mobile, dob, "
 * account type(Client, Operator)"
 *
 * Result:
 * ----------
 * Create an account with provided informations.
 * It could recreate account if mobile exists on database but not verify yet.
 *
 * Next:
 * ----------
 * The account need to be verify mobile and email.
 */
export type CreateAccount = {
  __typename?: "CreateAccount";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<OtpAccountObjectType>;
};

/** Test */
export type CreateAccountInput = {
  accountType: AccountType;
  dob: Scalars["Date"];
  email: Scalars["String"];
  fullName: Scalars["String"];
  password: Scalars["String"];
  recaptchaToken: Scalars["String"];
};

/** Create or update projects/farms/monitors */
export type CreateOrUpdateProject = {
  __typename?: "CreateOrUpdateProject";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DateTimeNullableFilter = {
  Equal?: InputMaybe<Scalars["DateTime"]>;
  Gt?: InputMaybe<Scalars["DateTime"]>;
  Gte?: InputMaybe<Scalars["DateTime"]>;
  In?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  Lt?: InputMaybe<Scalars["DateTime"]>;
  Lte?: InputMaybe<Scalars["DateTime"]>;
  Range?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
};

/** Create or update projects/farms/monitors */
export type DeleteProject = {
  __typename?: "DeleteProject";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: "DjangoDebug";
  /** Raise exceptions for this API query. */
  exceptions?: Maybe<Array<Maybe<DjangoDebugException>>>;
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single exception raised. */
export type DjangoDebugException = {
  __typename?: "DjangoDebugException";
  /** The class of the exception */
  excType: Scalars["String"];
  /** The message of the exception */
  message: Scalars["String"];
  /** The stack trace */
  stack: Scalars["String"];
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: "DjangoDebugSQL";
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars["String"];
  /** Duration of this database query in seconds. */
  duration: Scalars["Float"];
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars["String"]>;
  /** Whether this database query was a SELECT. */
  isSelect: Scalars["Boolean"];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars["Boolean"];
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars["String"]>;
  /** JSON encoded database query parameters. */
  params: Scalars["String"];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars["String"];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars["String"]>;
  /** Start time of this database query. */
  startTime: Scalars["Float"];
  /** Stop time of this database query. */
  stopTime: Scalars["Float"];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars["String"]>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars["String"]>;
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars["String"];
};

export type FarmDeleteInput = {
  id: Scalars["ID"];
  monitors?: InputMaybe<Array<InputMaybe<MonitorDeleteInput>>>;
};

export type FarmInput = {
  id?: InputMaybe<Scalars["ID"]>;
  isCollapsed?: InputMaybe<Scalars["Boolean"]>;
  monitors?: InputMaybe<Array<InputMaybe<MonitorInput>>>;
  name?: InputMaybe<Scalars["String"]>;
  pinOrder?: InputMaybe<Scalars["Boolean"]>;
};

export type FarmObjectType = {
  __typename?: "FarmObjectType";
  creator: RequestPasswordResetType;
  id: Scalars["ID"];
  isCollapsed: Scalars["Boolean"];
  monitors?: Maybe<Array<Maybe<MonitorObjectType>>>;
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  pinOrder: Scalars["BigInt"];
};

/** An enumeration. */
export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
  Other = "OTHER",
}

/** An enumeration. */
export enum HttpMethod {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
  Put = "PUT",
}

export type Header = {
  __typename?: "Header";
  key?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type HeaderInput = {
  key: Scalars["String"];
  value: Scalars["String"];
};

export type HttpMonitorObjectType = {
  __typename?: "HttpMonitorObjectType";
  assignZones?: Maybe<Array<Maybe<AssignZone>>>;
  creator: RequestPasswordResetType;
  expectedCodes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  farm: FarmObjectType;
  followRedirect: Scalars["Boolean"];
  headers?: Maybe<Array<Maybe<Header>>>;
  /** Host */
  host: Scalars["String"];
  id: Scalars["ID"];
  interval: Scalars["Int"];
  method?: Maybe<HttpMethod>;
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  password: Scalars["String"];
  /** Port */
  path: Scalars["String"];
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  /** Port */
  port: Scalars["String"];
  requestPayload: Scalars["String"];
  responseRegex: Scalars["String"];
  retries: Scalars["Int"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
  user: Scalars["String"];
};

export type HttpsMonitorObjectType = {
  __typename?: "HttpsMonitorObjectType";
  assignZones?: Maybe<Array<Maybe<AssignZone>>>;
  creator: RequestPasswordResetType;
  expectedCodes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  farm: FarmObjectType;
  followRedirect: Scalars["Boolean"];
  headers?: Maybe<Array<Maybe<Header>>>;
  /** Host */
  host: Scalars["String"];
  id: Scalars["ID"];
  interval: Scalars["Int"];
  method?: Maybe<HttpMethod>;
  name: Scalars["String"];
  notifySslNearlyExpriesInDays: Scalars["Int"];
  owner: RequestPasswordResetType;
  password: Scalars["String"];
  /** Port */
  path: Scalars["String"];
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  /** Port */
  port: Scalars["String"];
  requestPayload: Scalars["String"];
  responseRegex: Scalars["String"];
  retries: Scalars["Int"];
  sslCheck: Scalars["Boolean"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
  user: Scalars["String"];
};

export type IdFilter = {
  Equal?: InputMaybe<Scalars["BigInt"]>;
  Gt?: InputMaybe<Scalars["BigInt"]>;
  Gte?: InputMaybe<Scalars["BigInt"]>;
  In?: InputMaybe<Array<InputMaybe<Scalars["BigInt"]>>>;
  Lt?: InputMaybe<Scalars["BigInt"]>;
  Lte?: InputMaybe<Scalars["BigInt"]>;
};

export type InvitationObjectType = {
  __typename?: "InvitationObjectType";
  email?: Maybe<Scalars["String"]>;
  expiresAt?: Maybe<Scalars["Int"]>;
  expiresIn?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  inviterName?: Maybe<Scalars["String"]>;
  isExpired?: Maybe<Scalars["Boolean"]>;
  projectName?: Maybe<Scalars["String"]>;
  role?: Maybe<MemberRole>;
  status?: Maybe<MemberStatus>;
  uuid: Scalars["UUID"];
};

export type InvoiceObjectType = {
  __typename?: "InvoiceObjectType";
  created: Scalars["DateTime"];
  items?: Maybe<ItemObjectType>;
  receipts?: Maybe<Array<Maybe<ReceiptObjectType>>>;
  /** total in usd */
  subTotal: Scalars["Float"];
  /** total include tax in usd */
  total: Scalars["Float"];
};

export type InvoiceWhereInput = {
  created?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
};

export type ItemObjectType = {
  __typename?: "ItemObjectType";
  /** mount in usd */
  amount: Scalars["Float"];
  /** item/product code */
  code: Scalars["String"];
  created: Scalars["DateTime"];
  /** item/product code */
  description: Scalars["String"];
  /** item/product code */
  name: Scalars["String"];
  /** number of the items in invoices */
  quantity: Scalars["Int"];
};

/**
 * Auth user using a key login (mobile/email/username)
 *
 * Result:
 * ----------
 * If mobile of account is verified.
 *     - 2FA setting: ON => Need to verify 2FA via mobile (SMS/WhatSap)
 *     - 2FA setting: ON => Return JWT
 * If mobile of account is not verified. => Verify mobile/email using otp
 */
export type KeyAuth = {
  __typename?: "KeyAuth";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<AccountUnionType>;
};

export type KeyAuthInput = {
  accountType: AccountType;
  /** Email/Account/Mobile */
  loginKey: Scalars["String"];
  /** Password */
  password: Scalars["String"];
};

export type MemberDeleteInput = {
  id: Scalars["ID"];
};

export type MemberInput = {
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  role?: InputMaybe<MemberRole>;
  userId?: InputMaybe<Scalars["ID"]>;
};

export type MemberObjectType = {
  __typename?: "MemberObjectType";
  account?: Maybe<PublicAccountObjectType>;
  email: Scalars["String"];
  id: Scalars["ID"];
  role?: Maybe<MemberRole>;
  status?: Maybe<MemberStatus>;
};

/** An enumeration. */
export enum MemberRole {
  Admin = "ADMIN",
  Modify = "MODIFY",
  Read = "READ",
}

/** An enumeration. */
export enum MemberStatus {
  Accept = "ACCEPT",
  Deny = "DENY",
  WaitResponse = "WAIT_RESPONSE",
}

export type MonitorDeleteInput = {
  id: Scalars["ID"];
};

export type MonitorInput = {
  assignZones?: InputMaybe<Array<InputMaybe<ZoneInput>>>;
  database?: InputMaybe<Scalars["String"]>;
  expectedCodes?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  followRedirect?: InputMaybe<Scalars["Boolean"]>;
  headers?: InputMaybe<Array<InputMaybe<HeaderInput>>>;
  host?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  interval?: InputMaybe<Scalars["Int"]>;
  method?: InputMaybe<HttpMethod>;
  name?: InputMaybe<Scalars["String"]>;
  notifySslNearlyExpriesInDays?: InputMaybe<Scalars["Int"]>;
  password?: InputMaybe<Scalars["String"]>;
  path?: InputMaybe<Scalars["String"]>;
  pause?: InputMaybe<Scalars["Boolean"]>;
  pinOrder?: InputMaybe<Scalars["Boolean"]>;
  port?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<Scalars["String"]>;
  queryReturnExpect?: InputMaybe<Scalars["JSONString"]>;
  requestPayload?: InputMaybe<Scalars["String"]>;
  responseRegex?: InputMaybe<Scalars["String"]>;
  retries?: InputMaybe<Scalars["Int"]>;
  sslCheck?: InputMaybe<Scalars["Boolean"]>;
  timeout?: InputMaybe<Scalars["Int"]>;
  type?: InputMaybe<MonitorType>;
  user?: InputMaybe<Scalars["String"]>;
};

export type MonitorObjectType =
  | ApiMonitorObjectType
  | HttpMonitorObjectType
  | HttpsMonitorObjectType
  | PortMonitorObjectType
  | PostgressMonitorObjectType
  | RedisMonitorObjectType
  | SmtpMonitorObjectType;

/** An enumeration. */
export enum MonitorType {
  Api = "API",
  Grpc = "GRPC",
  Http = "HTTP",
  Https = "HTTPS",
  Kafka = "KAFKA",
  Mongo = "MONGO",
  Mysql = "MYSQL",
  Port = "PORT",
  Postgres = "POSTGRES",
  Rabbitqm = "RABBITQM",
  Redis = "REDIS",
  Smtp = "SMTP",
}

/** Mutation schems */
export type Mutation = {
  __typename?: "Mutation";
  _debug?: Maybe<DjangoDebug>;
  /**
   *
   *     Activate TOTP 2FA
   *     Must input otp_token for sender (Use RequestOtp)
   *
   *     Result:
   *     ----------
   *     Return token, and authpath with qr code
   *
   */
  activateTotp?: Maybe<ActivateTotp>;
  /**
   *
   *     Register an account with full name, mobile, dob, "
   *     account type(Client, Operator)"
   *
   *     Result:
   *     ----------
   *     Create an account with provided informations.
   *     It could recreate account if mobile exists on database but not verify yet.
   *
   *     Next:
   *     ----------
   *     The account need to be verify mobile and email.
   *
   */
  createAccount?: Maybe<CreateAccount>;
  /**
   *
   *     Create or update projects/farms/monitors
   *
   */
  createOrUpdateProject?: Maybe<CreateOrUpdateProject>;
  /**
   *
   *     Create or update projects/farms/monitors
   *
   */
  deleteProject?: Maybe<DeleteProject>;
  /**
   *
   *     Auth user using a key login (mobile/email/username)
   *
   *     Result:
   *     ----------
   *     If mobile of account is verified.
   *         - 2FA setting: ON => Need to verify 2FA via mobile (SMS/WhatSap)
   *         - 2FA setting: ON => Return JWT
   *     If mobile of account is not verified. => Verify mobile/email using otp
   *
   */
  keyAuth?: Maybe<KeyAuth>;
  refreshToken?: Maybe<Refresh>;
  /**
   *
   *     Using provider/access token to create or login user.
   *
   *     Result:
   *     ----------
   *     Login with existing user that associate to social account.
   *     Create new user and ask to update/verify email/mobile and profile.
   *
   */
  removeSocial?: Maybe<RemoveSocial>;
  /**
   *
   *     Reply invitation project
   *
   */
  replyProjectInviation?: Maybe<ReplyInvitationProject>;
  /**
   *
   *     Request sender token that need for otp request.
   *     Need to provide password to identify the logon user
   *
   *     Result:
   *     ----------
   *     Sender token for otp, that needs for sending otp to verify email/mobile include updating new mobile/email
   *
   *     Next:
   *     ----------
   *     Using before sending otp for mobile/email
   *
   */
  requestOtp?: Maybe<RequestOtp>;
  /**
   *
   *     To send password reset token to mobile/email. You need to request the sender token for password reset.
   *
   *     Result:
   *     ----------
   *     Sender token (uid) from account. This sender token must be passed to send password reset token
   *
   */
  requestPassword?: Maybe<RequestPasswordReset>;
  revokeToken?: Maybe<Revoke>;
  /**
   *
   *     Send or resend 2FA code. Using sender token (token field) to verify user
   *     Wait 1 mins to resend
   *
   *     Result:
   *     ----------
   *     Send 2FA to mobile or email based on the provided TokenTypeField
   *
   */
  send2fa?: Maybe<Send2Fa>;
  /**
   *
   *     Send otp to provided email.
   *
   *     Result:
   *     ----------
   *     Your email will recieved OTP.
   *
   *     Next:
   *     ----------
   *     Verify OTP for email
   *
   */
  sendOtpEmail?: Maybe<SendOtpEmail>;
  /**
   *
   *     Send otp to provided mobile.
   *
   *     Result:
   *     ----------
   *     Your mobile will recieved OTP.
   *
   *     Next:
   *     ----------
   *     Verify OTP for mobile
   *
   */
  sendOtpMobile?: Maybe<SendOtpMobile>;
  /**
   *
   *     To send password reset code to sms/email/both (2FA settings).
   *
   *     Result:
   *     ----------
   *     Send Password reset code to mobile or email based on the provided TokenTypeField (2FA settings)
   *
   */
  sendPasswordCode?: Maybe<SendPasswordResetToken>;
  setPassSocial?: Maybe<SetPasswordSocialAuth>;
  /**
   *
   *     Using provider/access token to create or login user.
   *
   *     Result:
   *     ----------
   *     Login with existing user that associate to social account.
   *     Create new user and ask to update/verify email/mobile and profile.
   *
   */
  socialAuth?: Maybe<SocialAuth>;
  /**
   *
   *     Subscribe or upgrade a plan in vailiable list
   *
   *     Result:
   *     ----------
   *
   */
  subscribe?: Maybe<SubscribeOrUpgrade>;
  /**
   *
   *     Update personal infomation of account.
   *
   *     Result:
   *     ----------
   *     Update  profile and set complete profile flag
   *
   */
  updateAccount?: Maybe<UpdateAccountInformation>;
  /**
   *
   *     Verify 2FA that user will be recieved via sms/whatsap/email (depend on 2fa settings)
   *
   *     Result:
   *     ----------
   *     If mobile of account is verified.
   *         - 2FA setting: ON => Need to verify 2FA via mobile (SMS/Whatsap)
   *         - 2FA setting: ON => Return JWT
   *
   */
  verify2fa?: Maybe<Verify2Fa>;
  /**
   *
   *     Verify and update email to account
   *
   *     Result:
   *     ----------
   *     Account will be updated the new email
   *
   *     Next:
   *     ----------
   *     Update and verify mobile if needed
   *
   */
  verifyOtpEmail?: Maybe<VerifyEmailOtp>;
  /**
   *
   *     Verify and update mobile to account
   *
   *     Result:
   *     ----------
   *     Account will be updated the new mobile
   *
   *     Next:
   *     ----------
   *     Update and verify email if needed
   *
   */
  verifyOtpMobile?: Maybe<VerifyMobileOtp>;
  /**
   *
   *     Verify your account by password reset code (that is sent to sms/mobile/both)
   *
   *     Result:
   *     ----------
   *     Confirm the password reset code and update new password.
   *
   */
  verifyPasswordCodeAndUpdate?: Maybe<VerifyPasswordResetCodeAndUpdate>;
  verifyPaypalSubscription?: Maybe<VerifySubscription>;
  verifyToken?: Maybe<Verify>;
  /**
   *
   *     Verify and update secret key for TOTP
   *
   *     Result:
   *     ----------
   *     Account will be updated 2fa TOTP
   *
   */
  verifyTotp?: Maybe<VerifyTotp>;
};

/** Mutation schems */
export type MutationActivateTotpArgs = {
  send?: InputMaybe<RequestTotpInput>;
};

/** Mutation schems */
export type MutationCreateAccountArgs = {
  user?: InputMaybe<CreateAccountInput>;
};

/** Mutation schems */
export type MutationCreateOrUpdateProjectArgs = {
  project?: InputMaybe<ProjectInput>;
};

/** Mutation schems */
export type MutationDeleteProjectArgs = {
  project?: InputMaybe<ProjectDeleteInput>;
};

/** Mutation schems */
export type MutationKeyAuthArgs = {
  credential: KeyAuthInput;
};

/** Mutation schems */
export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

/** Mutation schems */
export type MutationRemoveSocialArgs = {
  remove: RemoveSocialInput;
};

/** Mutation schems */
export type MutationReplyProjectInviationArgs = {
  reply?: InputMaybe<ReplyInvitationInput>;
};

/** Mutation schems */
export type MutationRequestOtpArgs = {
  credential: RequestOtpInput;
};

/** Mutation schems */
export type MutationRequestPasswordArgs = {
  forgot: RequestPasswordResetInput;
};

/** Mutation schems */
export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

/** Mutation schems */
export type MutationSend2faArgs = {
  send: Send2FaInput;
};

/** Mutation schems */
export type MutationSendOtpEmailArgs = {
  send?: InputMaybe<SendOtpEmailInput>;
};

/** Mutation schems */
export type MutationSendOtpMobileArgs = {
  send?: InputMaybe<SendOtpMobileInput>;
};

/** Mutation schems */
export type MutationSendPasswordCodeArgs = {
  send: PasswordResetTokenInputType;
};

/** Mutation schems */
export type MutationSetPassSocialArgs = {
  update: SocialPasswordUpdateInput;
};

/** Mutation schems */
export type MutationSocialAuthArgs = {
  token: SocialAuthInput;
};

/** Mutation schems */
export type MutationSubscribeArgs = {
  subscribe: SubscriptionInput;
};

/** Mutation schems */
export type MutationUpdateAccountArgs = {
  user?: InputMaybe<AccountInput>;
};

/** Mutation schems */
export type MutationVerify2faArgs = {
  token: Verify2FaInput;
};

/** Mutation schems */
export type MutationVerifyOtpEmailArgs = {
  token?: InputMaybe<VerifyOtpInput>;
};

/** Mutation schems */
export type MutationVerifyOtpMobileArgs = {
  token?: InputMaybe<VerifyOtpInput>;
};

/** Mutation schems */
export type MutationVerifyPasswordCodeAndUpdateArgs = {
  token: VerifyPasswordResetCodeAndUpdateInput;
};

/** Mutation schems */
export type MutationVerifyPaypalSubscriptionArgs = {
  subscribe: VerifySubscriptionInput;
};

/** Mutation schems */
export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

/** Mutation schems */
export type MutationVerifyTotpArgs = {
  token?: InputMaybe<VerifyOtpInput>;
};

export type NonePassAccountObjectType = {
  __typename?: "NonePassAccountObjectType";
  accountType?: Maybe<AccountType>;
  email?: Maybe<Scalars["String"]>;
  hasPassword?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  isCompleteProfile: Scalars["Boolean"];
  isEmailVerified: Scalars["Boolean"];
  isMobileVerified: Scalars["Boolean"];
};

export type OtpAccountObjectType = {
  __typename?: "OTPAccountObjectType";
  accountType?: Maybe<AccountType>;
  id: Scalars["ID"];
  isCompleteProfile: Scalars["Boolean"];
  isEmailVerified: Scalars["Boolean"];
  isMobileVerified: Scalars["Boolean"];
  otpToken?: Maybe<Scalars["UUID"]>;
  otpTokenExpriesAt?: Maybe<Scalars["Int"]>;
};

/** An enumeration. */
export enum OtpType {
  Sms = "SMS",
  Whatsap = "WHATSAP",
}

export type OwnerAccountObjectType = {
  __typename?: "OwnerAccountObjectType";
  avatar?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type PaginateInputType = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type PaginatedInvoiceType = {
  __typename?: "PaginatedInvoiceType";
  count?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  results?: Maybe<Array<Maybe<InvoiceObjectType>>>;
};

export type PasswordResetTokenInputType = {
  /** Required token to send otp, it will be generate when you want to update mobile/email or first time register */
  fpToken: Scalars["ID"];
  /** Recaptcha token which refer to: https://brianwjoe.com/2019/02/06/how-does-recaptcha-v3-work/On debug mode: we use: "DEBUG_MODE" to bypass recaptcha token */
  recaptchaToken: Scalars["String"];
  type: TokenType;
};

/** An enumeration. */
export enum PaymentMethod {
  GooglePay = "GOOGLE_PAY",
  Paypal = "PAYPAL",
}

/** An enumeration. */
export enum PlanInterval {
  Day = "DAY",
  Month = "MONTH",
  Week = "WEEK",
  Year = "YEAR",
}

export type PlanObjectType = {
  __typename?: "PlanObjectType";
  /** code of plan */
  code: Scalars["String"];
  /** Description plan */
  description: Scalars["String"];
  id: Scalars["ID"];
  /** interval credit */
  intervalCredit: Scalars["Int"];
  intervalUnit?: Maybe<PlanInterval>;
  /** name of plan */
  label: Scalars["String"];
  /** max monitor could create, 0 = unlimited */
  maxMonitor: Scalars["Int"];
  /** max project plan could create, 0 = unlimited */
  maxProject: Scalars["Int"];
  monitorTypes?: Maybe<Array<Maybe<MonitorType>>>;
  /** name of plan */
  name: Scalars["String"];
  notificationEmail: Scalars["Boolean"];
  notificationMsteam: Scalars["Boolean"];
  notificationSkype: Scalars["Boolean"];
  notificationSlack: Scalars["Boolean"];
  notificationSms: Scalars["Boolean"];
  notificationTelegram: Scalars["Boolean"];
  notificationViber: Scalars["Boolean"];
  notificationWhatsap: Scalars["Boolean"];
  notificationZalo: Scalars["Boolean"];
  /** paypal plan id */
  paypalPlanId: Scalars["String"];
  planType?: Maybe<PlanType>;
  /** price in usd */
  price: Scalars["Float"];
  status?: Maybe<PlanStatus>;
};

/** An enumeration. */
export enum PlanStatus {
  Active = "ACTIVE",
  Created = "CREATED",
  Inactive = "INACTIVE",
}

/** An enumeration. */
export enum PlanType {
  Custom = "CUSTOM",
  System = "SYSTEM",
}

export type PortMonitorObjectType = {
  __typename?: "PortMonitorObjectType";
  assignZones?: Maybe<Array<Maybe<AssignZone>>>;
  creator: RequestPasswordResetType;
  farm: FarmObjectType;
  /** Host */
  host: Scalars["String"];
  id: Scalars["ID"];
  interval: Scalars["Int"];
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  /** Port */
  port: Scalars["String"];
  retries: Scalars["Int"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
};

export type PostgressMonitorObjectType = {
  __typename?: "PostgressMonitorObjectType";
  assignZones?: Maybe<Array<Maybe<AssignZone>>>;
  creator: RequestPasswordResetType;
  database: Scalars["String"];
  farm: FarmObjectType;
  /** Host */
  host: Scalars["String"];
  id: Scalars["ID"];
  interval: Scalars["Int"];
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  password: Scalars["String"];
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  /** Port */
  port: Scalars["String"];
  query: Scalars["String"];
  /** Query return expect */
  queryReturnExpect: Scalars["JSONString"];
  retries: Scalars["Int"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
  user: Scalars["String"];
};

export type ProjectDeleteInput = {
  farms?: InputMaybe<Array<InputMaybe<FarmDeleteInput>>>;
  id: Scalars["ID"];
  members?: InputMaybe<Array<InputMaybe<MemberDeleteInput>>>;
};

export type ProjectInput = {
  farms?: InputMaybe<Array<InputMaybe<FarmInput>>>;
  id?: InputMaybe<Scalars["ID"]>;
  isCollapsed?: InputMaybe<Scalars["Boolean"]>;
  /** Logo for the project. */
  logo?: InputMaybe<Scalars["Upload"]>;
  members?: InputMaybe<Array<InputMaybe<MemberInput>>>;
  name?: InputMaybe<Scalars["String"]>;
  pinOrder?: InputMaybe<Scalars["Boolean"]>;
};

export type ProjectObjectType = {
  __typename?: "ProjectObjectType";
  canCreateFarm?: Maybe<Scalars["Boolean"]>;
  /** Could create monitor: Owner and Admin and plan permission */
  canCreateMonitor?: Maybe<Scalars["Boolean"]>;
  /** Could create project: Owner and Admin and plan permission */
  canCreateProject?: Maybe<Scalars["Boolean"]>;
  canDeleteFarm?: Maybe<Scalars["Boolean"]>;
  canDeleteMonitor?: Maybe<Scalars["Boolean"]>;
  /** Could delete project: Owner */
  canDeleteProject?: Maybe<Scalars["Boolean"]>;
  /** Could send invitation and change role: Owner and Admin and plan permission */
  canInviteProject?: Maybe<Scalars["Boolean"]>;
  canStartMonitor?: Maybe<Scalars["Boolean"]>;
  canStopMonitor?: Maybe<Scalars["Boolean"]>;
  canUpdateFarm?: Maybe<Scalars["Boolean"]>;
  canUpdateMonitor?: Maybe<Scalars["Boolean"]>;
  /** Could update notification: Owner and Admin */
  canUpdateNotify?: Maybe<Scalars["Boolean"]>;
  /** Could update project: Owner and Admin */
  canUpdateProject?: Maybe<Scalars["Boolean"]>;
  creator: RequestPasswordResetType;
  farms?: Maybe<Array<Maybe<FarmObjectType>>>;
  id: Scalars["ID"];
  /** Full Control on project (except delete) + notification */
  isAdmin?: Maybe<Scalars["Boolean"]>;
  isCollapsed: Scalars["Boolean"];
  /** Only update farm/monitor/start/stop + notification  */
  isModifier?: Maybe<Scalars["Boolean"]>;
  /** Full Control on project */
  isOwner?: Maybe<Scalars["Boolean"]>;
  /** Only reader just show + notification */
  isReader?: Maybe<Scalars["Boolean"]>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of response code for http monitor */
  listAvailableExceptionCodes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of avaible intervals */
  listAvailableIntervals?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of avaible method for http monitor */
  listAvailableMethods?: Maybe<Array<Maybe<Scalars["String"]>>>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of avaible monitor types */
  listAvailableMonitorTypes?: Maybe<Array<Maybe<MonitorType>>>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of avaible retries */
  listAvailableRetries?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of avaible timeout */
  listAvailableTimeouts?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  /** Based on a specific project, subscribed plan you will have a corresponding list of avaible zones */
  listAvailableZones?: Maybe<Array<Maybe<AvailbleZone>>>;
  logo?: Maybe<Scalars["String"]>;
  members?: Maybe<Array<Maybe<MemberObjectType>>>;
  name: Scalars["String"];
  owner?: Maybe<OwnerAccountObjectType>;
  pinOrder: Scalars["BigInt"];
};

export type PublicAccountObjectType = {
  __typename?: "PublicAccountObjectType";
  avatar?: Maybe<Scalars["String"]>;
  fullName: Scalars["String"];
  id: Scalars["ID"];
  username: Scalars["String"];
};

/** Query schems */
export type Query = {
  __typename?: "Query";
  _debug?: Maybe<DjangoDebug>;
  /** List Countries */
  countryList?: Maybe<Array<Maybe<Scalars["CountryJSON"]>>>;
  /**  Query user by email  */
  findAccount?: Maybe<Array<Maybe<PublicAccountObjectType>>>;
  /** Query Inviation */
  invitation?: Maybe<InvitationObjectType>;
  /** Query Invoices */
  invoices?: Maybe<PaginatedInvoiceType>;
  /** Query current system information setting */
  systemInfo?: Maybe<Scalars["SystemInformationCamelJSON"]>;
  /** Query current user */
  userInfo?: Maybe<AccountQueryUnionType>;
};

/** Query schems */
export type QueryFindAccountArgs = {
  projectId: Scalars["ID"];
  query: Scalars["String"];
};

/** Query schems */
export type QueryInvitationArgs = {
  uuid?: InputMaybe<Scalars["String"]>;
};

/** Query schems */
export type QueryInvoicesArgs = {
  paginate?: InputMaybe<PaginateInputType>;
  where?: InputMaybe<InvoiceWhereInput>;
};

export type ReceiptObjectType = {
  __typename?: "ReceiptObjectType";
  /** paid amount in usd */
  amount: Scalars["Float"];
  created: Scalars["DateTime"];
  /** account id for payment */
  paymentAccountId: Scalars["String"];
  paymentMethod?: Maybe<CoreReceiptPaymentMethodChoices>;
  status?: Maybe<CoreReceiptStatusChoices>;
  /** transaction id from thirdparty paygate */
  transactionId: Scalars["String"];
};

export type RedisMonitorObjectType = {
  __typename?: "RedisMonitorObjectType";
  assignZones?: Maybe<Array<Maybe<AssignZone>>>;
  creator: RequestPasswordResetType;
  database: Scalars["String"];
  farm: FarmObjectType;
  /** Host */
  host: Scalars["String"];
  id: Scalars["ID"];
  interval: Scalars["Int"];
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  password: Scalars["String"];
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  /** Port */
  port: Scalars["String"];
  retries: Scalars["Int"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
};

export type Refresh = {
  __typename?: "Refresh";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  token: Scalars["String"];
};

/**
 * Using provider/access token to create or login user.
 *
 * Result:
 * ----------
 * Login with existing user that associate to social account.
 * Create new user and ask to update/verify email/mobile and profile.
 */
export type RemoveSocial = {
  __typename?: "RemoveSocial";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type RemoveSocialInput = {
  provider: SocialProviderType;
  /** Uid social connect */
  uid: Scalars["String"];
};

export type ReplyInvitationInput = {
  status?: InputMaybe<MemberStatus>;
  uuid?: InputMaybe<Scalars["UUID"]>;
};

/** Reply invitation project */
export type ReplyInvitationProject = {
  __typename?: "ReplyInvitationProject";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/**
 * Request sender token that need for otp request.
 * Need to provide password to identify the logon user
 *
 * Result:
 * ----------
 * Sender token for otp, that needs for sending otp to verify email/mobile include updating new mobile/email
 *
 * Next:
 * ----------
 * Using before sending otp for mobile/email
 */
export type RequestOtp = {
  __typename?: "RequestOtp";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<OtpAccountObjectType>;
};

export type RequestOtpInput = {
  password: Scalars["String"];
};

/**
 * To send password reset token to mobile/email. You need to request the sender token for password reset.
 *
 * Result:
 * ----------
 * Sender token (uid) from account. This sender token must be passed to send password reset token
 */
export type RequestPasswordReset = {
  __typename?: "RequestPasswordReset";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<RequestPasswordResetType>;
};

export type RequestPasswordResetInput = {
  accountType: AccountType;
  /** Date of bith must be in range [16 - 80] year olds */
  dob: Scalars["Date"];
  /** Key Authen could be username, mobile, email */
  loginKey: Scalars["String"];
};

export type RequestPasswordResetType = {
  __typename?: "RequestPasswordResetType";
  accountType?: Maybe<AccountType>;
  email?: Maybe<Scalars["String"]>;
  fpToken?: Maybe<Scalars["UUID"]>;
  fpTokenExpriesAt?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  isEmailVerified: Scalars["Boolean"];
  isMobileVerified: Scalars["Boolean"];
  mobile?: Maybe<Scalars["String"]>;
};

export type RequestTotpInput = {
  /** Required token to send otp, it will be generate when you want to update mobile/email or first time register */
  otpToken: Scalars["ID"];
  /** Recaptcha token which refer to: https://brianwjoe.com/2019/02/06/how-does-recaptcha-v3-work/On debug mode: we use: "DEBUG_MODE" to bypass recaptcha token */
  recaptchaToken: Scalars["String"];
};

export type Revoke = {
  __typename?: "Revoke";
  revoked: Scalars["Int"];
};

/**
 * Send or resend 2FA code. Using sender token (token field) to verify user
 * Wait 1 mins to resend
 *
 * Result:
 * ----------
 * Send 2FA to mobile or email based on the provided TokenTypeField
 */
export type Send2Fa = {
  __typename?: "Send2FA";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<TokenObjectType>;
};

export type Send2FaInput = {
  /** Required token to send otp, it will be generate when you want to update mobile/email or first time register */
  faToken: Scalars["ID"];
  /** Recaptcha token which refer to: https://brianwjoe.com/2019/02/06/how-does-recaptcha-v3-work/On debug mode: we use: "DEBUG_MODE" to bypass recaptcha token */
  recaptchaToken: Scalars["String"];
  type: TwoFaType;
};

/**
 * Send otp to provided email.
 *
 * Result:
 * ----------
 * Your email will recieved OTP.
 *
 * Next:
 * ----------
 * Verify OTP for email
 */
export type SendOtpEmail = {
  __typename?: "SendOTPEmail";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<TokenObjectType>;
};

export type SendOtpEmailInput = {
  email: Scalars["String"];
  /** Required token to send otp, it will be generate when you want to update mobile/email or first time register */
  otpToken: Scalars["ID"];
  /** Recaptcha token which refer to: https://brianwjoe.com/2019/02/06/how-does-recaptcha-v3-work/On debug mode: we use: "DEBUG_MODE" to bypass recaptcha token */
  recaptchaToken: Scalars["String"];
};

/**
 * Send otp to provided mobile.
 *
 * Result:
 * ----------
 * Your mobile will recieved OTP.
 *
 * Next:
 * ----------
 * Verify OTP for mobile
 */
export type SendOtpMobile = {
  __typename?: "SendOTPMobile";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<TokenObjectType>;
};

export type SendOtpMobileInput = {
  mobile: Scalars["String"];
  /** Required token to send otp, it will be generate when you want to update mobile/email or first time register */
  otpToken: Scalars["ID"];
  otpType: OtpType;
  /** Recaptcha token which refer to: https://brianwjoe.com/2019/02/06/how-does-recaptcha-v3-work/On debug mode: we use: "DEBUG_MODE" to bypass recaptcha token */
  recaptchaToken: Scalars["String"];
};

/**
 * To send password reset code to sms/email/both (2FA settings).
 *
 * Result:
 * ----------
 * Send Password reset code to mobile or email based on the provided TokenTypeField (2FA settings)
 */
export type SendPasswordResetToken = {
  __typename?: "SendPasswordResetToken";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<TokenObjectType>;
};

export type SetPasswordSocialAuth = {
  __typename?: "SetPasswordSocialAuth";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<AccountUnionType>;
};

export type SmtpMonitorObjectType = {
  __typename?: "SmtpMonitorObjectType";
  assignZones?: Maybe<Array<Maybe<AssignZone>>>;
  creator: RequestPasswordResetType;
  farm: FarmObjectType;
  /** Host */
  host: Scalars["String"];
  id: Scalars["ID"];
  interval: Scalars["Int"];
  name: Scalars["String"];
  owner: RequestPasswordResetType;
  password: Scalars["String"];
  pause: Scalars["Boolean"];
  pinOrder: Scalars["BigInt"];
  /** Port */
  port: Scalars["String"];
  retries: Scalars["Int"];
  timeout: Scalars["Int"];
  type?: Maybe<MonitorType>;
  user: Scalars["String"];
};

/**
 * Using provider/access token to create or login user.
 *
 * Result:
 * ----------
 * Login with existing user that associate to social account.
 * Create new user and ask to update/verify email/mobile and profile.
 */
export type SocialAuth = {
  __typename?: "SocialAuth";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<AccountUnionType>;
};

export type SocialAuthInput = {
  /** Access token key for social account */
  accessToken: Scalars["String"];
  accountType: AccountType;
  provider: SocialProviderType;
};

export type SocialObjectType = {
  __typename?: "SocialObjectType";
  created: Scalars["DateTime"];
  extraData?: Maybe<Scalars["SocialCamelJSON"]>;
  provider: Scalars["String"];
  uid: Scalars["String"];
};

export type SocialPasswordUpdateInput = {
  password: Scalars["String"];
};

/** An enumeration. */
export enum SocialProviderType {
  Github = "GITHUB",
  GoogleOauth2 = "GOOGLE_OAUTH2",
}

/**
 * Subscribe or upgrade a plan in vailiable list
 *
 * Result:
 * ----------
 */
export type SubscribeOrUpgrade = {
  __typename?: "SubscribeOrUpgrade";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  paymentUrl?: Maybe<Scalars["String"]>;
};

export type SubscriptionInput = {
  paymentMethod: PaymentMethod;
  planId: Scalars["Int"];
};

export type SubscriptionObjectType = {
  __typename?: "SubscriptionObjectType";
  billCount: Scalars["Int"];
  /** payment subscription id */
  currentPaymentSubscriptionId: Scalars["String"];
  currentPlan?: Maybe<PlanObjectType>;
  currentPlanBillCount: Scalars["Int"];
  nextBillingDate?: Maybe<Scalars["Date"]>;
  /** paypal subscription id */
  nextPaymentSubscriptionId: Scalars["String"];
  nextPlan?: Maybe<PlanObjectType>;
  postBillingDate?: Maybe<Scalars["Date"]>;
  /** payment subscription id */
  postPaymentSubscriptionId: Scalars["String"];
  postPlan?: Maybe<PlanObjectType>;
  startDate: Scalars["Date"];
  status?: Maybe<CoreSubscriptionStatusChoices>;
};

export type TotpKeyObjectType = {
  __typename?: "TOTPKeyObjectType";
  expriesAt?: Maybe<Scalars["Int"]>;
  issueTime: Scalars["DateTime"];
  otpauth: Scalars["String"];
  secret: Scalars["String"];
  token: Scalars["UUID"];
};

export type TokenObjectType = {
  __typename?: "TokenObjectType";
  expriesAt?: Maybe<Scalars["Int"]>;
  issueTime: Scalars["DateTime"];
  token: Scalars["UUID"];
};

/** An enumeration. */
export enum TokenType {
  Email = "EMAIL",
  Sms = "SMS",
  Totp = "TOTP",
  Whatsap = "WHATSAP",
}

export type TwoFaAccountObjectType = {
  __typename?: "TwoFAAccountObjectType";
  accountType?: Maybe<AccountType>;
  faToken?: Maybe<Scalars["UUID"]>;
  faTokenExpriesAt?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  isCompleteProfile: Scalars["Boolean"];
  isEmailVerified: Scalars["Boolean"];
  isMobileVerified: Scalars["Boolean"];
  twoFaViaEmail: Scalars["Boolean"];
  twoFaViaMobile: Scalars["Boolean"];
  twoFaViaTotp: Scalars["Boolean"];
};

/** An enumeration. */
export enum TwoFaType {
  Email = "EMAIL",
  Sms = "SMS",
  Totp = "TOTP",
  Whatsap = "WHATSAP",
}

/**
 * Update personal infomation of account.
 *
 * Result:
 * ----------
 * Update  profile and set complete profile flag
 */
export type UpdateAccountInformation = {
  __typename?: "UpdateAccountInformation";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<AccountObjectType>;
};

export type Verify = {
  __typename?: "Verify";
  payload: Scalars["GenericScalar"];
};

/**
 * Verify 2FA that user will be recieved via sms/whatsap/email (depend on 2fa settings)
 *
 * Result:
 * ----------
 * If mobile of account is verified.
 *     - 2FA setting: ON => Need to verify 2FA via mobile (SMS/Whatsap)
 *     - 2FA setting: ON => Return JWT
 */
export type Verify2Fa = {
  __typename?: "Verify2FA";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<AccountUnionType>;
};

export type Verify2FaInput = {
  /** Code that is a text you recieve it by email or sms or whatsap */
  code: Scalars["String"];
  token: Scalars["UUID"];
};

/**
 * Verify and update email to account
 *
 * Result:
 * ----------
 * Account will be updated the new email
 *
 * Next:
 * ----------
 * Update and verify mobile if needed
 */
export type VerifyEmailOtp = {
  __typename?: "VerifyEmailOTP";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<OtpAccountObjectType>;
};

/**
 * Verify and update mobile to account
 *
 * Result:
 * ----------
 * Account will be updated the new mobile
 *
 * Next:
 * ----------
 * Update and verify email if needed
 */
export type VerifyMobileOtp = {
  __typename?: "VerifyMobileOTP";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<OtpAccountObjectType>;
};

export type VerifyOtpInput = {
  code: Scalars["String"];
  token: Scalars["UUID"];
};

/**
 * Verify your account by password reset code (that is sent to sms/mobile/both)
 *
 * Result:
 * ----------
 * Confirm the password reset code and update new password.
 */
export type VerifyPasswordResetCodeAndUpdate = {
  __typename?: "VerifyPasswordResetCodeAndUpdate";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type VerifyPasswordResetCodeAndUpdateInput = {
  code: Scalars["String"];
  newPassword: Scalars["String"];
  token: Scalars["UUID"];
};

export type VerifySubscription = {
  __typename?: "VerifySubscription";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type VerifySubscriptionInput = {
  paymentMethod: PaymentMethod;
  paymentSubscriptionId: Scalars["String"];
};

/**
 * Verify and update secret key for TOTP
 *
 * Result:
 * ----------
 * Account will be updated 2fa TOTP
 */
export type VerifyTotp = {
  __typename?: "VerifyTOTP";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<OtpAccountObjectType>;
};

export type ZoneInput = {
  code: Scalars["String"];
  name: Scalars["String"];
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>;

export type Unnamed_1_Query = {
  __typename?: "Query";
  userInfo?:
    | {
        __typename: "AccountObjectType";
        id: string;
        lastLogin?: any | null;
        username: string;
        mobile?: string | null;
        email?: string | null;
        isEmailVerified: boolean;
        isMobileVerified: boolean;
        isCompleteProfile: boolean;
        fullName: string;
        dob?: any | null;
        gender: CoreAccountGenderChoices;
        currentLat: number;
        currentLon: number;
        twoFaViaMobile: boolean;
        twoFaViaEmail: boolean;
        setting?: any | null;
        accountType?: AccountType | null;
        address?: {
          __typename?: "AccountAddressObjectType";
          id: string;
        } | null;
        socials?: Array<{
          __typename?: "SocialObjectType";
          uid: string;
          provider: string;
          created: any;
          extraData?: any | null;
        } | null> | null;
      }
    | { __typename: "NonePassAccountObjectType" }
    | {
        __typename: "OTPAccountObjectType";
        id: string;
        isEmailVerified: boolean;
        isMobileVerified: boolean;
        isCompleteProfile: boolean;
        otpToken?: any | null;
        accountType?: AccountType | null;
      }
    | null;
};

export const Document = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userInfo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "AccountObjectType" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastLogin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mobile" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isEmailVerified" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isMobileVerified" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isCompleteProfile" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fullName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "dob" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gender" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currentLat" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currentLon" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "twoFaViaMobile" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "twoFaViaEmail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "setting" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "socials" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "uid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "provider" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "created" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "extraData" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accountType" },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "OTPAccountObjectType" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isEmailVerified" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isMobileVerified" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isCompleteProfile" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "otpToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accountType" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Query, any>;
