import PortfolioCard from "../PortfolioCard";
import { mockPortfolio } from "@/lib/mockData";

export default function PortfolioCardExample() {
  return <PortfolioCard portfolio={mockPortfolio} />;
}
