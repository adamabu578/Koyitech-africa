"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../components/Sidebar";
import { MobileNav } from "../components/MobileNav";
import { Button } from "../components/Button";
import { Upload, FileText, X, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadMaterial() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [course, setCourse] = useState("Introduction to Web Development");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter(
        file => file.type === "application/pdf"
      );
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files).filter(
        file => file.type === "application/pdf"
      );
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="instructor" />

      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl">Upload Materials</h2>
            <p className="text-sm text-muted-foreground">Add course materials for students</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-primary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-full hover:bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Course Selection */}
              <div>
                <label className="block mb-2">Select Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  <option>Introduction to Web Development</option>
                  <option>Advanced React & TypeScript</option>
                  <option>UI/UX Design Fundamentals</option>
                </select>
              </div>

              {/* Material Title */}
              <div>
                <label className="block mb-2">Material Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Week 1 - HTML Basics"
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this material"
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2">Upload PDF Files</label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="mb-2">Drag and drop PDF files here</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse from your computer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Only PDF files are supported
                  </p>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <label className="block">Selected Files ({selectedFiles.length})</label>
                  {selectedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card rounded-xl p-4 border border-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeFile(index)}
                        className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center flex-shrink-0"
                      >
                        <X className="w-5 h-5 text-destructive" />
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/instructor")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    const existing = JSON.parse(localStorage.getItem("uploadedMaterials") || "[]");
                    
                    const newUploads = selectedFiles.map(file => ({
                      id: Date.now().toString() + Math.random().toString(),
                      title: title ? `${title} - ${file.name}` : file.name,
                      type: "PDF",
                      size: formatFileSize(file.size),
                      course: course,
                      description: description,
                      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    }));

                    if (selectedFiles.length === 0 && title !== "") {
                       newUploads.push({
                          id: Date.now().toString() + Math.random().toString(),
                          title: title,
                          type: "DOC",
                          size: "1.2 MB",
                          course: course,
                          description: description,
                          uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                       });
                    }

                    if (newUploads.length > 0) {
                      localStorage.setItem("uploadedMaterials", JSON.stringify([...newUploads, ...existing]));
                      toast.success("Materials uploaded successfully!");
                      router.push("/instructor");
                    } else {
                      toast.error("Please provide a title or select files to upload.");
                    }
                  }}
                >
                  Upload Materials
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <MobileNav userType="instructor" />
    </div>
  );
}
