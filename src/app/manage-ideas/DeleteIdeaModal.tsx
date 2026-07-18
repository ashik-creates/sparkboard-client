"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteIdea } from "@/lib/action/ideas";

interface DeleteIdeaModalProps {
  ideaId: string;
}

const DeleteIdeaModal = ({ ideaId }: DeleteIdeaModalProps) => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await deleteIdea(ideaId);

      setLoading(false);

      if (res.deletedCount > 0) {
        toast.success("Idea deleted successfully");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete idea");
      }
    } catch (error) {
      setLoading(false);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Button
        className="rounded-none"
        size="sm"
        variant="danger"
        onPress={() => setOpen(true)}
      >
        Delete
      </Button>

      <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="border border-border bg-background text-primary shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="border-b border-border">
              <Modal.Heading className="font-heading text-xl font-bold uppercase">
                Delete Idea
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="py-6">
              <p className="leading-7 text-secondary">
                Are you sure you want to permanently delete this idea?
              </p>

              <p className="mt-2 text-sm text-red-500">
                This action cannot be undone.
              </p>
            </Modal.Body>

            <Modal.Footer className="border-t border-border px-6 py-4">
              <Button
                variant="outline"
                className="rounded-none text-white"
                onPress={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                className="rounded-none"
                isDisabled={loading}
                onPress={handleDelete}
              >
                {loading ? "Deleting..." : "Delete Idea"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteIdeaModal;
