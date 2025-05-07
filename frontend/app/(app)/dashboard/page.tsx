import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WorkInProgressAlert from "@/components/work-in-progress-alert"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Control and manage your cross-chain transactions</p>
      </div>

      <WorkInProgressAlert />

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md bg-[#181A20] border border-cyan-400/40 rounded-lg">
          <TabsTrigger value="send" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white data-[state=inactive]:bg-[#181A20] data-[state=inactive]:text-gray-400">Send</TabsTrigger>
          <TabsTrigger value="swap" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white data-[state=inactive]:bg-[#181A20] data-[state=inactive]:text-gray-400">Swap</TabsTrigger>
          <TabsTrigger value="bridge" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white data-[state=inactive]:bg-[#181A20] data-[state=inactive]:text-gray-400">Bridge</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="mt-6">
          <Card className="bg-[#101014] border border-cyan-400/40 shadow-lg">
            <CardHeader>
              <CardTitle>Send Transaction</CardTitle>
              <CardDescription>Send tokens to any address on any supported chain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-chain">Source Chain</Label>
                <Select defaultValue="solana">
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination-chain">Destination Chain</Label>
                <Select>
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="token">Token</Label>
                <Select>
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="Enter recipient address"
                  className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white">
                Send Transaction
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="swap" className="mt-6">
          <Card className="bg-[#101014] border border-cyan-400/40 shadow-lg">
            <CardHeader>
              <CardTitle>Swap Tokens</CardTitle>
              <CardDescription>Swap tokens across different chains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-token">From</Label>
                <Select>
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-amount">Amount</Label>
                <Input
                  id="from-amount"
                  placeholder="0.00"
                  type="number"
                  className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              <div className="relative my-6">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-cyan-400/40"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full bg-[#181A20] border-cyan-400/40 text-white"
                  >
                    ↓
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-token">To</Label>
                <Select>
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-amount">You Receive</Label>
                <Input
                  id="to-amount"
                  placeholder="0.00"
                  type="number"
                  disabled
                  className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white">
                Swap Tokens
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bridge" className="mt-6">
          <Card className="bg-[#101014] border border-cyan-400/40 shadow-lg">
            <CardHeader>
              <CardTitle>Bridge Assets</CardTitle>
              <CardDescription>Move your assets between different blockchains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bridge-from-chain">From Chain</Label>
                <Select defaultValue="solana">
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bridge-to-chain">To Chain</Label>
                <Select>
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bridge-token">Token</Label>
                <Select>
                  <SelectTrigger className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bridge-amount">Amount</Label>
                <Input
                  id="bridge-amount"
                  placeholder="0.00"
                  type="number"
                  className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bridge-address">Destination Address (Optional)</Label>
                <Input
                  id="bridge-address"
                  placeholder="Enter destination address or leave empty to use your wallet"
                  className="bg-[#181A20] border-cyan-400/40 text-white focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white">
                Bridge Assets
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
