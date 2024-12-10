import AddPoints from "@/components/AddPoints";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/context/CurrentUserContext";
import {
  useGetAssignment,
  useGetSubmission,
  useGetSubmissions,
  useSubmitAnswer,
} from "@/services/assignmentsServices";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function AssignmentPage() {
  const { currentUser } = useCurrentUser();

  const role = currentUser.role;

  const params = useParams();
  const assignment_id = parseInt(params.assignment_id!);

  const { data: assignment } = useGetAssignment(assignment_id);

  return (
    <div className="w-full max-w-[800px] divide-y-2">
      <div className="flex flex-col gap-2 pb-5">
        <p className="text-5xl">{assignment?.title}</p>
        <p className="text-sm">
          <span>{assignment?.creator}</span> •{" "}
          <span>{assignment?.created_at}</span>
        </p>
        <p>{assignment?.points} points</p>
      </div>

      <div className="py-5">
        <p className="whitespace-pre-wrap">{assignment?.description}</p>
      </div>

      {role === "teacher" ? (
        <TeacherView assignment_id={assignment_id} />
      ) : (
        <StudentView assignment_id={assignment_id} />
      )}
    </div>
  );
}

interface ViewProps {
  assignment_id: number;
}

function TeacherView({ assignment_id }: ViewProps) {
  const params = useParams();
  const class_id = parseInt(params.class_id!);
  const { data: submissions, refetch: refetchSubmissions } = useGetSubmissions(
    assignment_id,
    class_id,
  );

  return (
    <div className="flex flex-col gap-6 pt-5">
      <p className="text-3xl">Submissions</p>
      <div className="flex divide-x-2">
        <div className="pr-4">
          <p className="text-4xl">
            {
              submissions?.filter(
                (submission) =>
                  submission.answer !== null &&
                  submission.given_points === null,
              ).length
            }
          </p>
          <p className="text-sm">Handed in</p>
        </div>
        <div className="pl-4 pr-4">
          <p className="text-4xl">
            {
              submissions?.filter((submission) => submission.answer === null)
                .length
            }
          </p>
          <p className="text-sm">Assigned</p>
        </div>
        <div className="pl-4">
          <p className="text-4xl">
            {
              submissions?.filter(
                (submission) => submission.given_points !== null,
              ).length
            }
          </p>
          <p className="text-sm">Marked</p>
        </div>
      </div>

      <div className="flex w-full max-w-[500px] flex-col gap-4">
        {submissions?.map((submission) => (
          <div
            key={submission.user_id}
            className="relative rounded-lg bg-gray-200 p-3"
          >
            <div className="flex justify-between">
              <div>
                <p>{submission.student_name}</p>
                <p className="text-xs text-gray-500">
                  {submission.submitted_at}
                </p>
              </div>
              {submission.given_points ? (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Marked</p>
                  <p className="text-sm">
                    {submission.given_points}/{submission.points}
                  </p>
                </div>
              ) : submission.answer ? (
                <p className="text-xs text-gray-500">Handed in</p>
              ) : (
                <p className="text-xs text-gray-500">Assigned</p>
              )}
            </div>

            {submission.answer && !submission.given_points && (
              <AddPoints
                points={submission.points}
                assignment_completion_id={submission.assignment_completion_id!}
                refetchSubmissions={refetchSubmissions}
              />
            )}

            {submission.answer && (
              <p className="mt-2 whitespace-pre-wrap border-t-2 border-t-white pt-2">
                {submission.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentView({ assignment_id }: ViewProps) {
  const { currentUser } = useCurrentUser();
  const student_id = currentUser.user_id;

  const { data: submission } = useGetSubmission(student_id, assignment_id);

  const { mutate: submitAnswer } = useSubmitAnswer();

  const [answer, setAnswer] = useState("");

  const handleSubmitAnswer = () => {
    const assignmentData = {
      assignment_id: assignment_id,
      student_id: student_id!,
      answer: answer,
    };

    submitAnswer(assignmentData, {
      onSuccess: (response) => {
        toast(response.message);
        setAnswer("");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 pt-5">
      {submission ? (
        <>
          <p className="text-3xl">Your work</p>
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-gray-200 p-5">
            <div className="flex items-center justify-between pb-2">
              <p className="text-xs">Submitted on {submission.submitted_at}</p>
              {submission.given_points ? (
                <p className="text-xs">
                  Marked{" "}
                  <span className="font-semibold">
                    {submission.given_points}/{submission.points}
                  </span>
                </p>
              ) : (
                <p className="text-xs">Handed in</p>
              )}
            </div>
            <p className="whitespace-pre-wrap pt-2">{submission.answer}</p>
          </div>
        </>
      ) : (
        <>
          <p className="text-3xl">Submit</p>
          <Textarea
            className="resize-none"
            rows={6}
            placeholder="Write your answer here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button
            className="self-end"
            disabled={!answer.trim().length}
            onClick={handleSubmitAnswer}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
}
