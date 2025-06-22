
interface Horse {
  show_price_to?: string;
  show_contact_to?: string;
}

interface UserProfile {
  verification_status?: string;
  account_type?: string;
}

export const useHorsePermissions = (profile: UserProfile | null) => {
  const canViewPrice = (horse: Horse) => {
    if (horse.show_price_to === 'all') return true;
    if (horse.show_price_to === 'verified' && profile?.verification_status === 'verified') return true;
    if (horse.show_price_to === 'premium' && ['premium', 'professional'].includes(profile?.account_type || '')) return true;
    return false;
  };

  const canViewContact = (horse: Horse) => {
    if (horse.show_contact_to === 'all') return true;
    if (horse.show_contact_to === 'verified' && profile?.verification_status === 'verified') return true;
    if (horse.show_contact_to === 'premium' && ['premium', 'professional'].includes(profile?.account_type || '')) return true;
    return false;
  };

  return { canViewPrice, canViewContact };
};
