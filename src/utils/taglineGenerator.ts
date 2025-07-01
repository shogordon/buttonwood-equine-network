
export const generateTagline = (data: any): string => {
  const { breed, disciplines, temperament, experienceLevel, description } = data;
  
  // Simple rule-based tagline generation
  const taglines = [];
  
  if (breed) {
    if (disciplines?.includes('dressage')) {
      taglines.push(`Elegant ${breed} ready for dressage excellence`);
    } else if (disciplines?.includes('jumping')) {
      taglines.push(`Athletic ${breed} with jumping potential`);
    } else if (disciplines?.includes('eventing')) {
      taglines.push(`Versatile ${breed} eventing prospect`);
    } else if (disciplines?.includes('western')) {
      taglines.push(`Reliable ${breed} for western disciplines`);
    } else if (disciplines?.includes('trail')) {
      taglines.push(`Calm ${breed} perfect for trail riding`);
    } else {
      taglines.push(`Beautiful ${breed} seeking new partnership`);
    }
  }
  
  if (temperament?.includes('calm') || temperament?.includes('gentle')) {
    taglines.push('Gentle soul with amazing temperament');
  } else if (temperament?.includes('energetic') || temperament?.includes('forward')) {
    taglines.push('Energetic partner ready for adventure');
  }
  
  if (experienceLevel === 'beginner') {
    taglines.push('Perfect for beginner riders');
  } else if (experienceLevel === 'professional') {
    taglines.push('Professional quality athlete');
  }
  
  // Extract key phrases from description
  if (description) {
    const desc = description.toLowerCase();
    if (desc.includes('champion') || desc.includes('winner')) {
      taglines.push('Proven competitor with winning record');
    } else if (desc.includes('gentle') || desc.includes('sweet')) {
      taglines.push('Sweet nature and willing attitude');
    } else if (desc.includes('trained') || desc.includes('education')) {
      taglines.push('Well-trained and educated');
    }
  }
  
  // Return the most specific tagline or a default
  return taglines[0] || 'Exceptional horse seeking perfect match';
};
