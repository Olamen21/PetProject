// Định nghĩa type cho điều kiện thú cưng
export type PetCondition = "normal" | "overweight" | "underweight";

// Hàm xây dựng vector nhu cầu dinh dưỡng
export function buildPetNeedVector(mer: number, condition: PetCondition): number[] {
  let proteinRatio: number, fatRatio: number, carbRatio: number;

  switch (condition) {
    case "overweight":
      proteinRatio = 0.3;
      fatRatio = 0.1;
      carbRatio = 0.6;
      break;
    case "underweight":
      proteinRatio = 0.3;
      fatRatio = 0.2;
      carbRatio = 0.5;
      break;
    default:
      proteinRatio = 0.25;
      fatRatio = 0.15;
      carbRatio = 0.6;
  }

  const proteinNeed = mer * proteinRatio;
  const fatNeed = mer * fatRatio;
  const carbNeed = mer * carbRatio;

  return [mer, proteinNeed, fatNeed, carbNeed];
}

// Hàm tính RER
export function calculateRER(weightKg: number): number {
  return 70 * Math.pow(weightKg, 0.75);
}

// Hàm lấy hệ số hoạt động
export function getActivityFactor(activity: string, species: string): [number, number] {
  if (species === "Dog") {
    switch (activity) {
      case "Indoor/Inactive": return [1.0, 1.4];
      case "Neutered adult": return [1.4, 1.6];
      case "Intact adult": return [1.6, 1.8];
      case "Overweight/Obesity": return [1.0, 1.2];
      case "Working/ Very active": return [1.6, 11.0];
      case "Growth < 4 months": return [3.0, 3.0];
      case "Growth >= 4 months": return [2.0, 2.0];
      case "Gestation": return [3.0, 3.0];
      default: return [1.6, 1.6];
    }
  }
  if (species === "Cat") {
    switch (activity) {
      case "Indoor/Inactive": return [1.0, 1.2];
      case "Neutered adult": return [1.2, 1.4];
      case "Intact adult": return [1.4, 1.6];
      case "Overweight/Obesity": return [0.8, 1.0];
      case "Growth (kittens)": return [2.5, 2.5];
      case "Gestation": return [1.6, 2.0];
      default: return [1.2, 1.2];
    }
  }
  return [1.0, 1.0];
}

// Hàm tính MER
export function calculateMER(weightKg: number, species: string, activity: string) {
  const rer = calculateRER(weightKg);
  const [kMin, kMax] = getActivityFactor(activity, species);
  console.log(`kMin: ${kMin}, kMax: ${kMax}, activity: ${activity}, species: ${species}`);
  const merMin = rer * kMin;
  const merMax = rer * kMax;
  const merAvg = (merMin + merMax) / 2;
  console.log(`MER Min: ${merMin}, MER Max: ${merMax}, MER Avg: ${merAvg}`);
  return merAvg;
}

// Hàm tính cosine similarity
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
