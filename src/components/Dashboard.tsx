"use client";

import useWidth from "@/hooks/useWidth";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="w-full max-w-[1500px] mx-auto p-2 sm:pt-8 flex flex-col gap-4 h-[calc(100vh-5rem)]">
      <DashboardHeader />
      <UserBalance />
      <Transactions />
    </div>
  );
}

function Transactions() {
  const windowWidth = useWidth();
  if (windowWidth && windowWidth > 640) {
    return (
      <div className="w-full rounded-lg border h-full min-h-[70vh]">
        <div className="w-full h-full">
          <div className="inline-flex h-16 items-center justify-center rounded-md border-b p-1 w-full rounded-b-none">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              You Owe
            </div>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              You are Owed
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-full mt-2">You Owe Here</div>
            <div className="w-full m-2">You are Owed here</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-lg border h-full min-h-[70vh]">
      <Tabs defaultValue="owe" className="w-full h-full">
        <TabsList className="w-full rounded-b-none">
          <TabsTrigger value="owe" className="w-full">
            You Owe
          </TabsTrigger>
          <TabsTrigger value="owed" className="w-full">
            You are Owed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="owe">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="owed">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

function UserBalance() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
      <UserBalanceCard title="Total Balance">100</UserBalanceCard>
      <UserBalanceCard title="Total Balance">100</UserBalanceCard>
      <UserBalanceCard title="Total Balance">100</UserBalanceCard>
    </div>
  );
}

function UserBalanceCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-transparent shadow w-full sm:min-w-[10rem]">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        <span className=" text-muted-foreground">&#8377;</span>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{children}</div>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex gap-4 sm:gap-10 flex-wrap flex-col sm:flex-row">
      <h2 className="text-3xl font-bold text-muted-foreground hidden sm:inline-block">
        Dashboard
      </h2>
      <div className="w-full sm:w-max flex gap-2 ml-auto">
        <Button className="w-full sm:w-max" variant="secondary">
          Friends
        </Button>
        <Button className="w-full sm:w-max" variant="secondary">
          Add Expense
        </Button>
      </div>
    </div>
  );
}