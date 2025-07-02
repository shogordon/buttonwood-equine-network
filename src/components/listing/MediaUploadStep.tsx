
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Plus, Image, Video, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const MediaUploadStep = ({ data, onUpdate }: StepProps) => {
  const [formData, setFormData] = useState({
    images: data.images || [],
    videos: data.videos || [],
    videoLink: '',
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addVideoLink = () => {
    if (formData.videoLink.trim()) {
      const updated = {
        ...formData,
        videos: [...formData.videos, formData.videoLink.trim()],
        videoLink: '',
      };
      setFormData(updated);
      onUpdate(updated);
    }
  };

  const removeVideo = (index: number) => {
    const updated = {
      ...formData,
      videos: formData.videos.filter((_: any, i: number) => i !== index),
    };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleVideoLinkChange = (value: string) => {
    setFormData({ ...formData, videoLink: value });
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Check if we're at the 10 image limit
    if (formData.images.length + files.length > 10) {
      toast.error('Maximum 10 photos allowed');
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not a valid image file`);
          continue;
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error(`${file.name} is too large. Maximum 5MB per file.`);
          continue;
        }

        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `images/${fileName}`;

        const { data, error } = await supabase.storage
          .from('horse-media')
          .upload(filePath, file);

        if (error) {
          console.error('Upload error:', error);
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('horse-media')
          .getPublicUrl(filePath);

        newImages.push(urlData.publicUrl);
      }

      if (newImages.length > 0) {
        const updated = {
          ...formData,
          images: [...formData.images, ...newImages],
        };
        setFormData(updated);
        onUpdate(updated);
        toast.success(`${newImages.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (index: number) => {
    const imageUrl = formData.images[index];
    
    // Extract file path from URL to delete from storage
    try {
      const url = new URL(imageUrl);
      const pathSegments = url.pathname.split('/');
      const filePath = pathSegments.slice(-2).join('/'); // Get last two segments (folder/filename)
      
      await supabase.storage
        .from('horse-media')
        .remove([filePath]);
    } catch (error) {
      console.error('Error deleting file from storage:', error);
    }

    const updated = {
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Media Upload</h2>
        <p className="text-white/60">Add photos and videos to showcase your horse</p>
      </div>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Photos</h3>
        </div>
        
        <div 
          className="border border-dashed border-white/20 rounded-2xl p-8 text-center"
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 mb-4">
            Drag and drop photos here, or click to browse
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || formData.images.length >= 10}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </>
            )}
          </Button>
          <p className="text-xs text-white/40 mt-2">
            Maximum 10 photos, up to 5MB each. JPG, PNG formats accepted.
          </p>
          <p className="text-xs text-white/50 mt-1">
            {formData.images.length}/10 photos uploaded
          </p>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {formData.images.map((image: string, index: number) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Horse photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/80 border-red-500 text-white hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Video className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Videos</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="videoLink" className="text-white mb-2 block">Video Links (YouTube, Vimeo, etc.)</Label>
            <div className="flex gap-2">
              <Input
                id="videoLink"
                value={formData.videoLink}
                onChange={(e) => handleVideoLinkChange(e.target.value)}
                placeholder="Paste video URL here"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 flex-1"
              />
              <Button
                onClick={addVideoLink}
                disabled={!formData.videoLink.trim()}
                className="bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {formData.videos.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium">Added Videos:</h4>
              {formData.videos.map((video: string, index: number) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <a
                    href={video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 truncate flex-1 mr-4"
                  >
                    {video}
                  </a>
                  <Button
                    onClick={() => removeVideo(index)}
                    size="sm"
                    variant="outline"
                    className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <div className="text-center text-white/60 text-sm">
        <p>High-quality photos and videos significantly increase interest in your listing.</p>
      </div>
    </div>
  );
};

export default MediaUploadStep;
