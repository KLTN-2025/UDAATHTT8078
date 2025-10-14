import { WalletProvider } from "@/contexts/WalletContext";
import ConnectWalletDialog from "../ConnectWalletDialog";

export default function ConnectWalletDialogExample() {
  return (
    <WalletProvider>
      <ConnectWalletDialog />
    </WalletProvider>
  );
}
