import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Crime interface
export interface ICrime extends Document {
  dr_no: string;
  date_rptd: string;
  date_occ: string;
  time_occ: string;
  area: string;
  area_name: string;
  rpt_dist_no?: string;
  part_1_2?: string;
  crm_cd?: string;
  crm_cd_desc: string;
  vict_age: string;
  vict_sex: string;
  vict_descent?: string;
  premis_cd?: string;
  premis_desc?: string;
  status?: string;
  status_desc: string;
  crm_cd_1?: string;
  crm_cd_2?: string;
  location: string;
  lat?: string;
  lon?: string;
}

// Create the Crime schema
const CrimeSchema: Schema = new Schema({
  dr_no: { type: String, required: true, unique: true },
  date_rptd: { type: String, required: true },
  date_occ: { type: String, required: true },
  time_occ: { type: String, required: true },
  area: { type: String, required: true },
  area_name: { type: String, required: true },
  rpt_dist_no: { type: String },
  part_1_2: { type: String },
  crm_cd: { type: String },
  crm_cd_desc: { type: String, required: true},
  vict_age: { type: String, requried: true },
  vict_sex: { type: String, requried: true },
  vict_descent: { type: String },
  premis_cd: { type: String },
  premis_desc: { type: String },
  status: { type: String },
  status_desc: { type: String, requried: true },
  crm_cd_1: { type: String },
  crm_cd_2: { type: String },
  location: { type: String, required: true },
  lat: { type: String },
  lon: { type: String },
});

// Create the Crime model
const Crime: Model<ICrime> = mongoose.models.Crime || mongoose.model<ICrime>("Crime", CrimeSchema);
export default Crime;