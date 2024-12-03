import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizList from "@/components/instructor-view/courses/quiz and assignment/QuizList";
import AssignmentList from "@/components/instructor-view/courses/quiz and assignment/AssignmentList";
import CommonDialogueQandA from "@/components/instructor-view/courses/quiz and assignment/CommonDialogueQandA";

const QuizAndAssignmentPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("quizzes");
  const [assessmentType, setAssessmentType] = useState("quiz");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Quiz & Assignment Management</CardTitle>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="quizzes">
              <QuizList />
            </TabsContent>
            <TabsContent value="assignments">
              <AssignmentList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* dialogue section */}
      <CommonDialogueQandA
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        assessmentType={assessmentType}
        setAssessmentType={setAssessmentType}
      />
    </div>
  );
};

export default QuizAndAssignmentPage;
