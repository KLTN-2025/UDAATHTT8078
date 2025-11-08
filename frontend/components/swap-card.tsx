import { WalletIcon } from "lucide-react"
import Image from "next/image"
import { UseFormReturn } from "react-hook-form"
import { SwapValue } from "@/utils/enum"
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Typography } from "./ui/typography"

interface SwapCardProps {
  destination: SwapValue
  onToggleModal: (destination: SwapValue) => void
  form: UseFormReturn<{
    payAmount: number
    receiveAmount: number
    payToken: string
    receiveToken: string
    payPrice: number
    receivePrice: number
    slippage: number
  }>
}

export const SwapCard = ({ destination ,onToggleModal, form }: SwapCardProps) => {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-orange-600/10 p-4 shadow-card">
      <div className="flex items-center justify-between">
        <Typography level="body4" color="secondary" className="">
          {destination}
        </Typography>
        <div className="flex items-center gap-3">
          <Typography level="body4" className="cursor-pointer font-semibold hover:text-cyan-600 hover:underline">
            Half
          </Typography>
          <Typography level="body4" className="cursor-pointer font-semibold hover:text-cyan-600 hover:underline">
            Max
          </Typography>
        </div>
      </div>

      <div className="flex items-center">
        <FormField
          control={form.control}
          name={destination === SwapValue.PAY ? "payAmount" : "receiveAmount"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="border-none border-transparent bg-transparent !shadow-none focus:border-transparent focus:ring-0"
                  onKeyDown={(e) => {
                    if (
                      e.key !== "Backspace" &&
                      e.key !== "ArrowUp" &&
                      e.key !== "ArrowDown" &&
                      !e.key.match(/^\d+$/)
                    ) {
                      e.preventDefault()
                    }
                  }}
                  onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className="flex h-10 w-36 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary-400/70"
          onClick={() => onToggleModal(destination)}
        >
          <Image
            priority
            src={`/icons/tokens/${
              form.watch(destination === SwapValue.PAY ? "payToken" : "receiveToken").toUpperCase() || "USDC"
            }.svg`}
            alt="token-logo"
            width={28}
            height={28}
          />
          <Typography level="body2" className="font-semibold text-white">
            {form.watch(destination === SwapValue.PAY ? "payToken" : "receiveToken").toUpperCase() || "USDC"}
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Typography level="body4" color="secondary" className="">
          $
          {destination === SwapValue.PAY
            ? ((form.watch("payPrice") / 10 ** 8) * form.watch("payAmount") || 0).toFixed(2)
            : ((form.watch("receivePrice") / 10 ** 8) * form.watch("receiveAmount") || 0).toFixed(2)}
        </Typography>

        <div className="flex items-center gap-2">
          <WalletIcon height={16} width={16} />
          <Typography level="body4">$0.024214</Typography>
        </div>
      </div>
    </div>
  )
}
