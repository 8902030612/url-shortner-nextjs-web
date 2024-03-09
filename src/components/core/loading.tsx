import { Progress } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      color="success"
    />
  );
}
