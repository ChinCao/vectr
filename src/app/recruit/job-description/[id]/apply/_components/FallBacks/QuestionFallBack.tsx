import {Skeleton} from "@/components/ui/skeleton";

const QuestionFallBack = () => {
  return (
    <div className="space-y-2 flex flex-col items-center justify-center">
      <Skeleton className="h-4 w-[90%] min-w-[300px] bg-gray-200" />
      <Skeleton className="h-4 w-[80%] min-w-[250px] bg-gray-200" />
    </div>
  );
};

export default QuestionFallBack;
