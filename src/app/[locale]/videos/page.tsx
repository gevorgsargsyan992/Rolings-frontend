"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS, VideoStatus } from "./constants";
import { VideosData, VideoStatusKey } from "./types";
import { VIDEOS } from "@/apiConstants";
import { formattedDate } from "@/utils";
import NoData from "@/components/NoData";
import PageContainer from "@/components/PageContainer";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { UserType } from "@/types/UserTypes";
import { TableSkeleton } from "@/components/Skeleton";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Typography from "@/components/Typography";

const { Text } = Typography;

const MAX_FILE_MB = 20;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

const Videos: FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [originalVideos, setOriginalVideos] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [createForm, setCreateForm] = useState({ name: "", file: null as File | null });
  const [editForm, setEditForm] = useState({ name: "", status: "" });

  const { get, post, patch, _delete, loading } = useApi<any>();

  const fetchVideos = useCallback(async () => {
    try {
      const data = await get(`${VIDEOS}`);
      const list = Array.isArray(data) ? data : data?.result ?? [];
      setOriginalVideos(list);
      const videosToShow = list.map((video: VideosData) => ({
        ...video,
        createdAt: video?.createdAt && formattedDate(video.createdAt),
        status: VideoStatus[video.status as VideoStatusKey],
      }));
      setVideos(videosToShow);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }, [get]);

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadToS3 = useCallback(async (file: File, name: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    const res = await fetch("/api/videos/upload", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const json = await res.json();
    if (!json.success || !json.url) {
      throw new Error(json.message || "Upload failed");
    }
    return json.url;
  }, []);

  const handleCreateVideo = useCallback(async () => {
    const { name, file } = createForm;
    if (!name.trim()) {
      setUploadError("Name is required");
      return;
    }
    if (!file) {
      setUploadError("Please select an MP4 file");
      return;
    }
    if (file.type !== "video/mp4") {
      setUploadError("Only MP4 files are allowed");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploadError(`File must be under ${MAX_FILE_MB}MB`);
      return;
    }
    setUploadError(null);
    setCreateLoading(true);
    try {
      const url = await uploadToS3(file, name.trim());
      const response = (await post(`${VIDEOS}`, { name: name.trim(), url })) as any;
      if (response?.success !== false && (response?.id || response?.success)) {
        setCreateForm({ name: "", file: null });
        setIsCreateModalOpen(false);
        await fetchVideos();
      } else {
        setUploadError("Failed to save video. Please try again.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setCreateLoading(false);
    }
  }, [createForm, uploadToS3, post, fetchVideos]);

  const openEdit = useCallback((row: any) => {
    const original = originalVideos.find((v: any) => v.id === row.id);
    if (original) {
      setEditingVideoId(original.id);
      setEditForm({
        name: original.name || "",
        status: String(original.status) || "",
      });
      setIsEditModalOpen(true);
    }
  }, [originalVideos]);

  const handleEditVideo = useCallback(async () => {
    if (!editingVideoId) return;
    if (!editForm.name.trim()) return;
    setCreateLoading(true);
    try {
      await patch(`${VIDEOS}/${editingVideoId}`, {
        name: editForm.name.trim(),
        status: +editForm.status,
      });
      setEditingVideoId(null);
      setIsEditModalOpen(false);
      await fetchVideos();
    } catch (err) {
      console.error("Error updating video:", err);
    } finally {
      setCreateLoading(false);
    }
  }, [editingVideoId, editForm, patch, fetchVideos]);

  const onClickDelete = useCallback((row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteVideo = useCallback(async () => {
    const id = selectedRow?.id;
    if (!id) return;
    try {
      await _delete(`${VIDEOS}/${id}`);
      setIsDeleteModalOpen(false);
      setSelectedRow(null);
      await fetchVideos();
    } catch (err) {
      console.error("Error deleting video:", err);
    }
  }, [selectedRow, _delete, fetchVideos]);

  return (
    <ProtectedRoute allowedRoles={[UserType.SUPER_ADMIN]}>
      <PageContainer className="bg-white pb-40 pt-10">
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsCreateModalOpen(true)}>Create Video</Button>
        </div>
        {loading ? (
          <TableSkeleton />
        ) : videos.length > 0 ? (
          <Table
            columns={COLUMNS}
            data={videos}
            url="video"
            className="overflow-x-auto whitespace-nowrap"
            isRowClickable={false}
            rowActions={[
              { label: "Edit", onClick: openEdit },
              { label: "Delete", onClick: onClickDelete },
            ]}
          />
        ) : (
          <NoData />
        )}
      </PageContainer>

      {/* Create Video Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setCreateForm({ name: "", file: null });
          setUploadError(null);
        }}
        showButtons={false}
      >
        <div className="flex flex-col gap-4 px-5 py-4 min-w-[320px]">
          <Text bold className="text-xl">
            Create Video
          </Text>
          <div>
            <Text bold className="mb-2">Name *</Text>
            <Input
              type="text"
              placeholder="Video name"
              value={createForm.name}
              onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <Text bold className="mb-2">MP4 File (max {MAX_FILE_MB}MB) *</Text>
            <input
              type="file"
              accept=".mp4,video/mp4"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setCreateForm((p) => ({ ...p, file: f || null }));
                setUploadError(null);
              }}
            />
            {createForm.file && (
              <Text className="text-sm text-gray-500 mt-1">
                {createForm.file.name} ({(createForm.file.size / 1024 / 1024).toFixed(2)} MB)
              </Text>
            )}
          </div>
          {uploadError && (
            <Text className="text-sm text-red-600">{uploadError}</Text>
          )}
          <div className="flex gap-4 justify-end pt-2 border-t border-gray-300">
            <Button
              type="ghost"
              onClick={() => {
                setIsCreateModalOpen(false);
                setCreateForm({ name: "", file: null });
                setUploadError(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateVideo} loading={createLoading}>
              Upload & Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Video Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingVideoId(null);
        }}
        showButtons={false}
      >
        <div className="flex flex-col gap-4 px-5 py-4 min-w-[320px]">
          <Text bold className="text-xl">
            Edit Video
          </Text>
          <div>
            <Text bold className="mb-2">Name *</Text>
            <Input
              type="text"
              placeholder="Video name"
              value={editForm.name}
              onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <Text bold className="mb-2">Status *</Text>
            <select
              value={editForm.status}
              onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value }))}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
            >
              {Object.entries(VideoStatus).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 justify-end pt-2 border-t border-gray-300">
            <Button type="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditVideo} loading={createLoading}>
              Update
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        subtitle="Do you want to delete this video?"
        onConfirm={handleDeleteVideo}
      />
    </ProtectedRoute>
  );
};

export default Videos;
