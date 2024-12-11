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
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Quiz & Assignment Management
              </CardTitle>
            </div>
            <Button
              className="w-full sm:w-auto flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
              onClick={() => setShowCreateDialog(true)}
            >
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
