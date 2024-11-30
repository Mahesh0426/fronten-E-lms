// CommonDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizForm from "./QuizForm";
import AssessmentForm from "./AssignmentForm";

const CommonDialogQandA = ({
  open,
  onOpenChange,
  assessmentType,
  setAssessmentType,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Quiz And Assessment</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={assessmentType}
          className="mt-4"
          onValueChange={setAssessmentType}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="assignment">Assignment</TabsTrigger>
          </TabsList>
          <TabsContent value="quiz">
            <QuizForm onClose={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="assignment">
            <AssessmentForm onClose={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialogQandA;
