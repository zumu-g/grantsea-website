import MinimalistContactForm from '@/components/MinimalistContactForm';
import './contact.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <MinimalistContactForm />
    </div>
  );
}

export const metadata = {
  title: 'Contact Us | Grant\'s Estate Agents',
  description: 'Get in touch with Grant\'s Estate Agents for all your real estate needs in Melbourne\'s Southeast',
};