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

  const role = currentUser?.role;

  const params = useParams();
  const assignment_id = parseInt(params.assignment_id!);

  const { data: assignment } = useGetAssignment(assignment_id);

  return (
    <section className="flex w-full justify-center p-6">
      <div className="w-full max-w-[800px] divide-y-2">
        <div className="flex flex-col gap-2 pb-5">
          <p className="text-5xl">{assignment?.title}</p>
          <p className="text-sm">
            <span>{assignment?.creator}</span> •{" "}
            <span>{assignment?.created_at}</span>
          </p>
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
    </section>
  );
}

interface ViewProps {
  assignment_id: number;
}

function TeacherView({ assignment_id }: ViewProps) {
  const params = useParams();
  const class_id = parseInt(params.class_id!);
  const { data: submissions } = useGetSubmissions(assignment_id, class_id);

  return (
    <div className="flex flex-col gap-6 pt-5">
      <p className="text-3xl">Submissions</p>
      <div className="flex divide-x-2">
        <div className="pr-4">
          <p className="text-4xl">
            {
              submissions?.filter((submission) => submission.answer !== null)
                .length
            }
          </p>
          <p className="text-sm">Handed in</p>
        </div>
        <div className="pl-4">
          <p className="text-4xl">
            {
              submissions?.filter((submission) => submission.answer === null)
                .length
            }
          </p>
          <p className="text-sm">Assigned</p>
        </div>
      </div>

      <div className="flex w-full max-w-[500px] flex-col gap-4">
        {submissions?.map((submission) => (
          <div key={submission.user_id} className="rounded-lg bg-gray-200 p-3">
            <div className="flex items-center justify-between">
              <p>{submission.student_name}</p>
              <p className="text-xs text-gray-500">
                {submission.answer ? "Handed in" : "Assigned"}
              </p>
            </div>

            <p className="text-xs text-gray-500">{submission.submitted_at}</p>
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
  const student_id = currentUser?.user_id;

  const { data: submission, refetch: refetchSubmission } = useGetSubmission(
    student_id!,
    assignment_id,
  );

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
        refetchSubmission();
        setAnswer("");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 pt-5">
      {submission ? (
        <>
          <p className="text-3xl">Your work</p>
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-gray-200 p-3">
            <p className="pb-2 text-xs">{submission.submitted_at}</p>
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
