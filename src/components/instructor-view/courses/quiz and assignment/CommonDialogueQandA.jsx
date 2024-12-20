// CommonDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizForm from "./QuizForm";
import AssessmentForm from "./AssignmentForm";

const CommonDialogQandA = ({
  showDialog,
  setShowDialog,
  assessmentType,
  setAssessmentType,
  edittedAssignmentId,
}) => {
  console.log("assignmentId:", edittedAssignmentId);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {edittedAssignmentId
              ? "Edit Assignment"
              : "Create New Quiz And Assessment"}
          </DialogTitle>
          <DialogDescription>you can create from here.</DialogDescription>
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
            <QuizForm onClose={() => setShowDialog(false)} />
          </TabsContent>
          <TabsContent value="assignment">
            <AssessmentForm
              onClose={() => setShowDialog(false)}
              edittedAssignmentId={edittedAssignmentId}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialogQandA;
