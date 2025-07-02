-- Create storage bucket for horse media
INSERT INTO storage.buckets (id, name, public) VALUES ('horse-media', 'horse-media', true);

-- Create storage policies for horse media
CREATE POLICY "Horse media are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'horse-media');

CREATE POLICY "Users can upload their own horse media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'horse-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own horse media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'horse-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own horse media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'horse-media' AND auth.uid()::text = (storage.foldername(name))[1]);