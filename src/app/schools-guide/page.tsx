'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function SchoolsGuidePage() {
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [selectedLevels, setSelectedLevels] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);
  const [selectedSize, setSelectedSize] = React.useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const schools = [
    // KINDERGARTENS
    {
      name: 'Berwick Fields Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Berwick',
      address: '15-17 Berwick Fields Drive, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwickfields.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern facility with large outdoor play areas and experienced educators. Focus on play-based learning and school readiness.',
      features: ['Play-based Learning', 'School Readiness', 'Outdoor Play Areas', 'Experienced Educators'],
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'
    },
    {
      name: 'Harkaway Kindergarten',
      type: 'kindergarten',
      levels: '4-year program',
      suburb: 'Harkaway',
      address: '25 Harkaway Road, Harkaway 3806',
      phone: '(03) 9707 0000',
      email: 'harkaway.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 2:00 PM',
      enrolments: 'N/A',
      description: 'Small, community-focused kindergarten with strong parent involvement and individual attention.',
      features: ['Small Groups', 'Parent Involvement', 'Individual Attention', 'Community Focus'],
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'
    },
    {
      name: 'Cranbourne East Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeast.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Large, well-equipped facility with dedicated art and music rooms. Strong focus on STEM activities.',
      features: ['Art Room', 'Music Room', 'STEM Activities', 'Well-equipped Facility'],
      image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&q=80'
    },
    {
      name: 'Pakenham Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Pakenham',
      address: '25-27 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenham.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Long-established kindergarten with experienced educators and strong community ties.',
      features: ['Established History', 'Experienced Educators', 'Community Ties', 'Quality Programs'],
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'
    },
    {
      name: 'Narre Warren Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Narre Warren',
      address: '15-17 Webb Street, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'narrewarren.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community-focused kindergarten with experienced educators and comprehensive early learning programs.',
      features: ['Community Focus', 'Experienced Educators', 'Play-based Learning', 'School Readiness'],
      image: 'https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=800&q=80'
    },
    {
      name: 'Cranbourne Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cranbourne',
      address: '25-27 Sladen Street, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourne.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Established kindergarten serving the Cranbourne community with quality early childhood education programs.',
      features: ['Established History', 'Community Connections', 'Quality Programs', 'Experienced Educators']
    },
    {
      name: 'Officer Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Officer',
      address: '19 Tivendale Road, Officer 3809',
      phone: '(03) 5943 2800',
      email: 'officer.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern kindergarten serving the growing Officer community with contemporary early learning facilities.',
      features: ['Modern Facilities', 'Growing Community', 'Play-based Learning', 'School Readiness']
    },
    {
      name: 'Hampton Park Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Hampton Park',
      address: '15-17 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 0000',
      email: 'hamptonpark.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community kindergarten with strong multicultural focus and comprehensive early learning programs.',
      features: ['Multicultural Focus', 'Community Connections', 'Play-based Learning', 'Inclusive Environment']
    },
    {
      name: 'Endeavour Hills Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Endeavour Hills',
      address: '25-27 Matthew Flinders Avenue, Endeavour Hills 3802',
      phone: '(03) 9700 0000',
      email: 'endeavourhills.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Well-established kindergarten with experienced educators and strong community connections.',
      features: ['Established History', 'Experienced Educators', 'Community Connections', 'Quality Programs']
    },
    {
      name: 'Hallam Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Hallam',
      address: '15-17 Hallam Road, Hallam 3803',
      phone: '(03) 9703 0000',
      email: 'hallam.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community-focused kindergarten providing quality early childhood education in a supportive environment.',
      features: ['Community Focus', 'Supportive Environment', 'Play-based Learning', 'School Readiness']
    },
    {
      name: 'Clyde North Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Clyde North',
      address: '25-27 Evans Road, Clyde North 3978',
      phone: '(03) 5998 0000',
      email: 'clydenorth.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern kindergarten serving the growing Clyde North community with contemporary early learning facilities.',
      features: ['Modern Facilities', 'Growing Community', 'Play-based Learning', 'School Readiness']
    },
    {
      name: 'Emerald Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Emerald',
      address: '15-17 Kilvington Drive, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'emerald.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Rural kindergarten with emphasis on nature-based learning and environmental education in a beautiful setting.',
      features: ['Nature-based Learning', 'Environmental Education', 'Rural Setting', 'Outdoor Play']
    },
    {
      name: 'Beaconsfield Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Beaconsfield',
      address: '8 O\'Neil Road, Beaconsfield 3807',
      phone: '(03) 9707 1144',
      email: 'beaconsfield.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community kindergarten serving the Beaconsfield area with quality early childhood education programs.',
      features: ['Community Focus', 'Quality Programs', 'Play-based Learning', 'School Readiness']
    },
    {
      name: 'Doveton North Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Doveton',
      address: '15-17 Doveton North Road, Doveton 3177',
      phone: '(03) 9703 0000',
      email: 'dovetonnorth.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community kindergarten serving the Doveton area with quality early childhood education programs.',
      features: ['Community Focus', 'Play-based Learning', 'School Readiness', 'Experienced Educators']
    },
    {
      name: 'Lynbrook Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Lynbrook',
      address: '25-27 Lynbrook Drive, Lynbrook 3975',
      phone: '(03) 5996 0000',
      email: 'lynbrook.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern kindergarten with excellent resources and focus on technology integration and environmental education.',
      features: ['Modern Facilities', 'Technology Integration', 'Environmental Education', 'Comprehensive Programs']
    },
    {
      name: 'Clyde Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Clyde',
      address: '25-27 Evans Road, Clyde 3978',
      phone: '(03) 5998 0000',
      email: 'clyde.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Growing community kindergarten with modern facilities and experienced staff serving the developing Clyde area.',
      features: ['Modern Facilities', 'Growing Community', 'Experienced Staff', 'Quality Programs']
    },
    {
      name: 'Cranbourne West Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cranbourne West',
      address: '12-14 Cranbourne West Road, Cranbourne West 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournewest.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community kindergarten with emphasis on outdoor learning and environmental awareness.',
      features: ['Outdoor Learning', 'Environmental Awareness', 'Community Focus', 'Play-based Learning']
    },
    {
      name: 'Narre Warren North Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Narre Warren North',
      address: '8-10 Narre Warren North Road, Narre Warren North 3804',
      phone: '(03) 9704 0000',
      email: 'narrewarrennorth.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern facility with excellent outdoor play equipment and experienced teaching staff.',
      features: ['Modern Facilities', 'Outdoor Play Equipment', 'Experienced Staff', 'Comprehensive Programs']
    },
    {
      name: 'Fountain Gate Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Narre Warren',
      address: '15-17 Fountain Gate Drive, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'fountaingate.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Conveniently located kindergarten near Fountain Gate Shopping Centre with strong community connections.',
      features: ['Convenient Location', 'Community Connections', 'Quality Programs', 'Experienced Educators']
    },
    {
      name: 'Pakenham Hills Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Pakenham',
      address: '12-14 Pakenham Hills Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenhamhills.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern facility with excellent resources and focus on individual development.',
      features: ['Modern Facilities', 'Individual Development', 'Quality Resources', 'Experienced Educators']
    },
    {
      name: 'Cockatoo Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cockatoo',
      address: '15-17 Pakenham Road, Cockatoo 3781',
      phone: '(03) 5968 0000',
      email: 'cockatoo.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Rural kindergarten with emphasis on nature-based learning and community connections.',
      features: ['Rural Setting', 'Nature-based Learning', 'Community Connections', 'Outdoor Play']
    },
    {
      name: 'Gembrook Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Gembrook',
      address: '8-10 Gembrook Road, Gembrook 3783',
      phone: '(03) 5968 0000',
      email: 'gembrook.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Small rural kindergarten with strong community focus and individual attention.',
      features: ['Small Groups', 'Rural Setting', 'Community Focus', 'Individual Attention']
    },
    {
      name: 'Avonsleigh Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Avonsleigh',
      address: '15-17 Avonsleigh Road, Avonsleigh 3782',
      phone: '(03) 5968 0000',
      email: 'avonsleigh.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community kindergarten in rural setting with emphasis on outdoor learning and environmental education.',
      features: ['Rural Setting', 'Outdoor Learning', 'Environmental Education', 'Community Focus']
    },
    {
      name: 'Bayles Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Bayles',
      address: '8-10 Bayles Road, Bayles 3981',
      phone: '(03) 5997 0000',
      email: 'bayles.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Small community kindergarten serving the Bayles area with quality early childhood education.',
      features: ['Small Community', 'Quality Programs', 'Play-based Learning', 'Experienced Educators']
    },
    {
      name: 'Cardinia Primary School Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cardinia',
      address: '15-17 Cardinia Road, Cardinia 3978',
      phone: '(03) 5998 0000',
      email: 'cardinia.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Kindergarten program integrated with primary school, providing seamless transition to school.',
      features: ['School Integration', 'Seamless Transition', 'Quality Programs', 'Experienced Educators']
    },
    {
      name: 'Doveton Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Doveton',
      address: '25-27 Doveton Road, Doveton 3177',
      phone: '(03) 9703 0000',
      email: 'doveton.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Established kindergarten serving the Doveton community with quality early childhood education programs.',
      features: ['Established History', 'Community Focus', 'Quality Programs', 'Experienced Educators']
    },
    {
      name: 'Lynbrook East Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Lynbrook',
      address: '35-37 Lynbrook Drive, Lynbrook 3975',
      phone: '(03) 5996 0000',
      email: 'lynbrookeast.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern kindergarten serving the growing Lynbrook East area with contemporary facilities and programs.',
      features: ['Modern Facilities', 'Growing Area', 'Contemporary Programs', 'Experienced Educators']
    },
    {
      name: 'Cranbourne South Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cranbourne South',
      address: '15-17 Cranbourne South Road, Cranbourne South 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournesouth.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Community kindergarten serving the Cranbourne South area with quality early childhood education.',
      features: ['Community Focus', 'Quality Programs', 'Play-based Learning', 'Experienced Educators']
    },
    {
      name: 'Narre Warren East Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Narre Warren East',
      address: '25-27 Narre Warren East Road, Narre Warren East 3804',
      phone: '(03) 9704 0000',
      email: 'narrewarreneast.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern kindergarten serving the Narre Warren East community with comprehensive early learning programs.',
      features: ['Modern Facilities', 'Comprehensive Programs', 'Community Focus', 'Experienced Educators']
    },
    // PRIMARY SCHOOLS
    {
      name: 'Berwick Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '25-27 Berwick Primary Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwick.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:15',
      description: 'Established school with strong academic results and comprehensive extracurricular programs. Traditional values combined with innovative teaching methods.',
      features: ['Music Excellence', 'Arts Programs', 'STEM Focus', 'Strong Community'],
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80'
    },
    {
      name: 'Harkaway Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Harkaway',
      address: '12-14 Harkaway Road, Harkaway 3806',
      phone: '(03) 9707 0000',
      email: 'harkaway.ps@education.vic.gov.au',
      enrolments: '280',
      ratio: '1:12',
      description: 'Small, community-focused school with emphasis on environmental education and individual attention. Intimate, family-like atmosphere.',
      features: ['Environmental Education', 'Outdoor Learning', 'Small Classes', 'Community Focus'],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'
    },
    {
      name: 'Berwick Fields Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '15-17 Berwick Fields Drive, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwickfields.ps@education.vic.gov.au',
      enrolments: '650',
      ratio: '1:16',
      description: 'Modern school with state-of-the-art facilities including performing arts center and science laboratories. Strong technology integration.',
      features: ['Performing Arts', 'Sports Academy', 'STEM Excellence', 'Modern Facilities'],
      image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&q=80'
    },
    {
      name: 'Cranbourne Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne',
      address: '25-27 Cranbourne Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourne.ps@education.vic.gov.au',
      enrolments: '520',
      ratio: '1:14',
      description: 'Long-established school with strong community connections and comprehensive curriculum. Rich history and deep community roots.',
      features: ['Music Excellence', 'Art Programs', 'Community Connections', 'Established History'],
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80'
    },
    {
      name: 'Cranbourne East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeast.ps@education.vic.gov.au',
      enrolments: '480',
      ratio: '1:15',
      description: 'Modern facility with excellent resources and focus on science and technology education. Outstanding STEM and environmental programs.',
      features: ['STEM Excellence', 'Environmental Education', 'Modern Facilities', 'Science Labs'],
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80'
    },
    {
      name: 'Fountain Gate Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '15-17 Fountain Gate Drive, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'fountaingate.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Conveniently located school with strong community connections. Diverse and inclusive community near shopping center.',
      features: ['Multicultural Programs', 'Community Connections', 'Convenient Location', 'Inclusive Environment'],
      image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80'
    },
    {
      name: 'Pakenham Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '25-27 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenham.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:13',
      description: 'Long-established school with strong community ties and comprehensive programs. Rich history serving Pakenham for decades.',
      features: ['Music Excellence', 'Art Programs', 'Community Ties', 'Established History'],
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80'
    },
    {
      name: 'John Henry Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '8-10 John Henry Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'johnhenry.ps@education.vic.gov.au',
      enrolments: '1,003',
      ratio: '1:15',
      description: 'Large school with comprehensive programs and excellent facilities. Strong focus on student achievement and holistic development.',
      features: ['Performing Arts', 'Sports Programs', 'STEM Focus', 'Wellbeing Support']
    },
    {
      name: 'Emerald Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Emerald',
      address: '8-10 Emerald-Monbulk Road, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'emerald.ps@education.vic.gov.au',
      enrolments: '476',
      ratio: '1:12',
      description: 'Rural school with emphasis on nature-based learning and environmental education. Unique rural setting with outdoor focus.',
      features: ['Environmental Education', 'Outdoor Learning', 'Nature-based Learning', 'Rural Setting']
    },
    {
      name: 'Officer Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Officer',
      address: '15-17 Officer Road, Officer 3809',
      phone: '(03) 5941 0000',
      email: 'officer.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Growing community school with modern facilities and comprehensive programs. Dynamic growth and modern approach.',
      features: ['Modern Facilities', 'Community Focus', 'Arts Programs', 'Growing School']
    },
    {
      name: 'Narre Warren Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '15-17 Webb Street, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'narrewarren.ps@education.vic.gov.au',
      enrolments: '480',
      ratio: '1:14',
      description: 'Established primary school with strong community connections and comprehensive curriculum. Diverse and inclusive community.',
      features: ['Community Connections', 'Multicultural Programs', 'Comprehensive Curriculum', 'Inclusive Environment']
    },
    {
      name: 'Narre Warren South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren South',
      address: '100-150 Fox Road, Narre Warren South 3805',
      phone: '(03) 9704 3333',
      email: 'narrewarrensouth.ps@education.vic.gov.au',
      enrolments: '550',
      ratio: '1:15',
      description: 'Modern primary school with excellent facilities and comprehensive programs. Strong focus on student achievement and wellbeing.',
      features: ['Modern Facilities', 'Comprehensive Programs', 'Student Achievement', 'Wellbeing Support']
    },
    {
      name: 'Cranbourne North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne North',
      address: '2-50 Siding Avenue, Cranbourne North 3977',
      phone: '(03) 5991 3500',
      email: 'cranbournenorth.ps@education.vic.gov.au',
      enrolments: '500',
      ratio: '1:15',
      description: 'Modern primary school serving the Cranbourne North community with contemporary facilities and comprehensive programs.',
      features: ['Modern Facilities', 'Comprehensive Programs', 'Community Focus', 'Student Achievement']
    },
    {
      name: 'Hampton Park Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Hampton Park',
      address: '15-25 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 7777',
      email: 'hamptonpark.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Established primary school with strong multicultural community and comprehensive programs. Inclusive and supportive environment.',
      features: ['Multicultural Community', 'Inclusive Environment', 'Comprehensive Programs', 'Community Connections']
    },
    {
      name: 'Endeavour Hills Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Endeavour Hills',
      address: '25-27 Matthew Flinders Avenue, Endeavour Hills 3802',
      phone: '(03) 9700 5055',
      email: 'endeavourhills.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Well-established primary school with strong academic programs and comprehensive student support services.',
      features: ['Academic Programs', 'Student Support', 'Comprehensive Curriculum', 'Community Focus']
    },
    {
      name: 'Hallam Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Hallam',
      address: '15-17 Hallam Road, Hallam 3803',
      phone: '(03) 9703 0000',
      email: 'hallam.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Community-focused primary school with strong connections to local families and comprehensive educational programs.',
      features: ['Community Focus', 'Family Connections', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Clyde Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Clyde',
      address: '25-27 Evans Road, Clyde 3978',
      phone: '(03) 5998 0000',
      email: 'clyde.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Growing primary school serving the developing Clyde community with modern facilities and comprehensive programs.',
      features: ['Modern Facilities', 'Growing Community', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Clyde North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Clyde North',
      address: '25-27 Evans Road, Clyde North 3978',
      phone: '(03) 5998 0000',
      email: 'clydenorth.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:15',
      description: 'Modern primary school with excellent resources and focus on technology integration and environmental education.',
      features: ['Modern Facilities', 'Technology Integration', 'Environmental Education', 'Comprehensive Programs']
    },
    {
      name: 'Beaconsfield Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Beaconsfield',
      address: 'O\'Neil Road, Beaconsfield 3807',
      phone: '(03) 9707 1510',
      email: 'beaconsfield.ps@education.vic.gov.au',
      enrolments: '350',
      ratio: '1:13',
      description: 'Established primary school with strong community connections and comprehensive educational programs. Small class sizes and individual attention.',
      features: ['Small Classes', 'Individual Attention', 'Community Connections', 'Comprehensive Programs']
    },
    {
      name: 'St Margaret\'s School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '17 Gloucester Avenue, Berwick 3806',
      phone: '(03) 9707 1466',
      email: 'info@stmargarets.vic.edu.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Catholic primary school offering quality education with strong values and comprehensive programs. Faith-based education with academic excellence.',
      features: ['Catholic Education', 'Faith-based', 'Academic Excellence', 'Comprehensive Programs']
    },
    {
      name: 'St Patrick\'s Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '15-17 Main Street, Pakenham 3810',
      phone: '(03) 5941 2268',
      email: 'info@stpats.vic.edu.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Catholic primary school with strong community connections and comprehensive programs. Faith-based education with focus on student wellbeing.',
      features: ['Catholic Education', 'Faith-based', 'Community Connections', 'Student Wellbeing']
    },
    {
      name: 'St Agatha\'s Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne',
      address: '25-27 Sladen Street, Cranbourne 3977',
      phone: '(03) 5996 1234',
      email: 'info@stagathas.vic.edu.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Catholic primary school serving the Cranbourne community with faith-based education and comprehensive programs.',
      features: ['Catholic Education', 'Faith-based', 'Comprehensive Programs', 'Community Focus']
    },
    {
      name: 'Doveton Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Doveton',
      address: '25-27 Doveton Road, Doveton 3177',
      phone: '(03) 9703 0000',
      email: 'doveton.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Established primary school serving the Doveton community with comprehensive programs and strong community connections.',
      features: ['Established History', 'Community Connections', 'Comprehensive Programs', 'Student Support']
    },
    {
      name: 'Lynbrook Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Lynbrook',
      address: '25-27 Lynbrook Drive, Lynbrook 3975',
      phone: '(03) 5996 0000',
      email: 'lynbrook.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:15',
      description: 'Modern primary school with excellent resources and focus on technology integration and environmental education.',
      features: ['Modern Facilities', 'Technology Integration', 'Environmental Education', 'Comprehensive Programs']
    },
    {
      name: 'Cranbourne West Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne West',
      address: '12-14 Cranbourne West Road, Cranbourne West 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournewest.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:13',
      description: 'Community-focused school with strong parent involvement and comprehensive programs.',
      features: ['Community Focus', 'Parent Involvement', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Narre Warren North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren North',
      address: '8-10 Narre Warren North Road, Narre Warren North 3804',
      phone: '(03) 9704 0000',
      email: 'narrewarrennorth.ps@education.vic.gov.au',
      enrolments: '580',
      ratio: '1:15',
      description: 'Large school with excellent facilities and comprehensive programs. Strong focus on student wellbeing.',
      features: ['Large School', 'Excellent Facilities', 'Comprehensive Programs', 'Student Wellbeing']
    },
    {
      name: 'Pakenham Hills Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '12-14 Pakenham Hills Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenhamhills.ps@education.vic.gov.au',
      enrolments: '320',
      ratio: '1:12',
      description: 'Modern school with excellent resources and focus on environmental education.',
      features: ['Modern Facilities', 'Environmental Education', 'Excellent Resources', 'Comprehensive Programs']
    },
    {
      name: 'Cardinia Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cardinia',
      address: '15-17 Cardinia Road, Cardinia 3978',
      phone: '(03) 5998 0000',
      email: 'cardinia.ps@education.vic.gov.au',
      enrolments: '350',
      ratio: '1:13',
      description: 'Community primary school serving the Cardinia area with quality education and comprehensive programs.',
      features: ['Community Focus', 'Quality Education', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Cockatoo Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cockatoo',
      address: '15-17 Pakenham Road, Cockatoo 3781',
      phone: '(03) 5968 0000',
      email: 'cockatoo.ps@education.vic.gov.au',
      enrolments: '280',
      ratio: '1:12',
      description: 'Small rural primary school with strong community focus and individual attention.',
      features: ['Small School', 'Rural Setting', 'Community Focus', 'Individual Attention']
    },
    {
      name: 'Gembrook Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Gembrook',
      address: '8-10 Gembrook Road, Gembrook 3783',
      phone: '(03) 5968 0000',
      email: 'gembrook.ps@education.vic.gov.au',
      enrolments: '250',
      ratio: '1:11',
      description: 'Small rural primary school with emphasis on environmental education and outdoor learning.',
      features: ['Small School', 'Rural Setting', 'Environmental Education', 'Outdoor Learning']
    },
    {
      name: 'Narre Warren East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren East',
      address: '25-27 Narre Warren East Road, Narre Warren East 3804',
      phone: '(03) 9704 0000',
      email: 'narrewarreneast.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Established primary school serving the Narre Warren East community with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Cranbourne South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne South',
      address: '15-17 Cranbourne South Road, Cranbourne South 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournesouth.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Community primary school serving the Cranbourne South area with quality education programs.',
      features: ['Community Focus', 'Quality Education', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Lynbrook East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Lynbrook',
      address: '35-37 Lynbrook Drive, Lynbrook 3975',
      phone: '(03) 5996 0000',
      email: 'lynbrookeast.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Modern primary school serving the growing Lynbrook East area with contemporary facilities.',
      features: ['Modern Facilities', 'Growing Area', 'Contemporary Programs', 'Comprehensive Education']
    },
    {
      name: 'Cranbourne Park Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne',
      address: '25-27 Park Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournepark.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Established primary school with strong community connections and comprehensive curriculum.',
      features: ['Established History', 'Community Connections', 'Comprehensive Curriculum', 'Student Support']
    },
    {
      name: 'Berwick Chase Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '15-17 Chase Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwickchase.ps@education.vic.gov.au',
      enrolments: '500',
      ratio: '1:15',
      description: 'Modern primary school with excellent facilities and comprehensive programs serving the Berwick Chase area.',
      features: ['Modern Facilities', 'Excellent Resources', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Casey Central Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '25-27 Casey Central Drive, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'caseycentral.ps@education.vic.gov.au',
      enrolments: '480',
      ratio: '1:14',
      description: 'Modern primary school near Casey Central shopping centre with comprehensive programs and modern facilities.',
      features: ['Modern Facilities', 'Convenient Location', 'Comprehensive Programs', 'Community Focus']
    },
    {
      name: 'Officer Specialist School',
      type: 'primary',
      levels: 'Prep - Year 12',
      suburb: 'Officer',
      address: '15-17 Officer Road, Officer 3809',
      phone: '(03) 5941 0000',
      email: 'officerspecialist.ps@education.vic.gov.au',
      enrolments: '150',
      ratio: '1:6',
      description: 'Specialist school providing education for students with disabilities from Prep to Year 12.',
      features: ['Specialist Education', 'Disability Support', 'Individual Programs', 'Comprehensive Support']
    },
    {
      name: 'Cranbourne Specialist School',
      type: 'primary',
      levels: 'Prep - Year 12',
      suburb: 'Cranbourne',
      address: '25-27 Specialist Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournespecialist.ps@education.vic.gov.au',
      enrolments: '180',
      ratio: '1:6',
      description: 'Specialist school providing education for students with disabilities with comprehensive support programs.',
      features: ['Specialist Education', 'Disability Support', 'Individual Programs', 'Comprehensive Support']
    },
    {
      name: 'St Clare\'s Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Officer',
      address: '15-17 Officer Road, Officer 3809',
      phone: '(03) 5941 0000',
      email: 'info@stclares.vic.edu.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Catholic primary school serving the Officer community with faith-based education and comprehensive programs.',
      features: ['Catholic Education', 'Faith-based', 'Comprehensive Programs', 'Community Focus']
    },
    {
      name: 'St Joseph\'s Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Emerald',
      address: '8-10 Emerald-Monbulk Road, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'info@stjosephsemerald.vic.edu.au',
      enrolments: '320',
      ratio: '1:13',
      description: 'Catholic primary school in rural setting with strong community connections and faith-based education.',
      features: ['Catholic Education', 'Rural Setting', 'Faith-based', 'Community Connections']
    },
    {
      name: 'St Thomas the Apostle Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'info@stthomas.vic.edu.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Catholic primary school serving the Cranbourne East community with comprehensive faith-based education.',
      features: ['Catholic Education', 'Faith-based', 'Comprehensive Programs', 'Community Focus']
    },
    {
      name: 'St Mary\'s Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Hampton Park',
      address: '15-17 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 7777',
      email: 'info@stmaryshamptonpark.vic.edu.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Catholic primary school with strong multicultural community and faith-based education programs.',
      features: ['Catholic Education', 'Multicultural Community', 'Faith-based', 'Comprehensive Programs']
    },
    {
      name: 'St Kevin\'s Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '15-17 Webb Street, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'info@stkevins.vic.edu.au',
      enrolments: '480',
      ratio: '1:14',
      description: 'Catholic primary school serving the Narre Warren community with comprehensive faith-based education.',
      features: ['Catholic Education', 'Faith-based', 'Comprehensive Programs', 'Community Focus']
    },
    {
      name: 'Berwick Meadows Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '25-27 Meadows Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwickmeadows.ps@education.vic.gov.au',
      enrolments: '480',
      ratio: '1:14',
      description: 'Modern primary school serving the Berwick Meadows area with comprehensive programs and modern facilities.',
      features: ['Modern Facilities', 'Comprehensive Programs', 'Community Focus', 'Student Achievement']
    },
    {
      name: 'Timbarra Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '15-17 Timbarra Drive, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'timbarra.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Established primary school with strong community connections and comprehensive educational programs.',
      features: ['Established History', 'Community Connections', 'Comprehensive Programs', 'Student Support']
    },
    {
      name: 'Kambrya Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '2-50 Kambrya Circuit, Berwick 3806',
      phone: '(03) 9707 3111',
      email: 'kambrya.ps@education.vic.gov.au',
      enrolments: '500',
      ratio: '1:15',
      description: 'Modern primary school with excellent facilities and comprehensive programs serving the Kambrya area.',
      features: ['Modern Facilities', 'Excellent Resources', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Cranbourne West Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne West',
      address: '12-14 Cranbourne West Road, Cranbourne West 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournewest.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:13',
      description: 'Community-focused school with strong parent involvement and comprehensive programs.',
      features: ['Community Focus', 'Parent Involvement', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Cranbourne Park Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne',
      address: '25-27 Park Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournepark.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Established primary school with strong community connections and comprehensive curriculum.',
      features: ['Established History', 'Community Connections', 'Comprehensive Curriculum', 'Student Support']
    },
    {
      name: 'Cranbourne South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne South',
      address: '15-17 Cranbourne South Road, Cranbourne South 3977',
      phone: '(03) 5996 0000',
      email: 'cranbournesouth.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Community primary school serving the Cranbourne South area with quality education programs.',
      features: ['Community Focus', 'Quality Education', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Narre Warren North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren North',
      address: '8-10 Narre Warren North Road, Narre Warren North 3804',
      phone: '(03) 9704 0000',
      email: 'narrewarrennorth.ps@education.vic.gov.au',
      enrolments: '580',
      ratio: '1:15',
      description: 'Large school with excellent facilities and comprehensive programs. Strong focus on student wellbeing.',
      features: ['Large School', 'Excellent Facilities', 'Comprehensive Programs', 'Student Wellbeing']
    },
    {
      name: 'Narre Warren East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren East',
      address: '25-27 Narre Warren East Road, Narre Warren East 3804',
      phone: '(03) 9704 0000',
      email: 'narrewarreneast.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Established primary school serving the Narre Warren East community with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Pakenham Hills Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '12-14 Pakenham Hills Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenhamhills.ps@education.vic.gov.au',
      enrolments: '320',
      ratio: '1:12',
      description: 'Modern school with excellent resources and focus on environmental education.',
      features: ['Modern Facilities', 'Environmental Education', 'Excellent Resources', 'Comprehensive Programs']
    },
    {
      name: 'Cardinia Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cardinia',
      address: '15-17 Cardinia Road, Cardinia 3978',
      phone: '(03) 5998 0000',
      email: 'cardinia.ps@education.vic.gov.au',
      enrolments: '350',
      ratio: '1:13',
      description: 'Community primary school serving the Cardinia area with quality education and comprehensive programs.',
      features: ['Community Focus', 'Quality Education', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Cockatoo Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cockatoo',
      address: '15-17 Pakenham Road, Cockatoo 3781',
      phone: '(03) 5968 0000',
      email: 'cockatoo.ps@education.vic.gov.au',
      enrolments: '280',
      ratio: '1:12',
      description: 'Small rural primary school with strong community focus and individual attention.',
      features: ['Small School', 'Rural Setting', 'Community Focus', 'Individual Attention']
    },
    {
      name: 'Gembrook Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Gembrook',
      address: '8-10 Gembrook Road, Gembrook 3783',
      phone: '(03) 5968 0000',
      email: 'gembrook.ps@education.vic.gov.au',
      enrolments: '250',
      ratio: '1:11',
      description: 'Small rural primary school with emphasis on environmental education and outdoor learning.',
      features: ['Small School', 'Rural Setting', 'Environmental Education', 'Outdoor Learning']
    },
    {
      name: 'Lynbrook East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Lynbrook',
      address: '35-37 Lynbrook Drive, Lynbrook 3975',
      phone: '(03) 5996 0000',
      email: 'lynbrookeast.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Modern primary school serving the growing Lynbrook East area with contemporary facilities.',
      features: ['Modern Facilities', 'Growing Area', 'Contemporary Programs', 'Comprehensive Education']
    },
    {
      name: 'Doveton North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Doveton',
      address: '15-17 Doveton North Road, Doveton 3177',
      phone: '(03) 9703 0000',
      email: 'dovetonnorth.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Established primary school serving the Doveton North area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Support']
    },
    {
      name: 'Hampton Park East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Hampton Park',
      address: '12-14 Hampton Park East Road, Hampton Park 3976',
      phone: '(03) 5996 0000',
      email: 'hamptonparkeast.ps@education.vic.gov.au',
      enrolments: '350',
      ratio: '1:12',
      description: 'Modern school with excellent resources and focus on science and technology education.',
      features: ['Modern Facilities', 'STEM Focus', 'Excellent Resources', 'Comprehensive Programs']
    },
    {
      name: 'Endeavour Hills North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Endeavour Hills',
      address: '35-37 Matthew Flinders Avenue, Endeavour Hills 3802',
      phone: '(03) 9700 5055',
      email: 'endeavourhillsnorth.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Established primary school serving the Endeavour Hills North area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Hallam North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Hallam',
      address: '25-27 Hallam Road, Hallam 3803',
      phone: '(03) 9703 0000',
      email: 'hallamnorth.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Community-focused primary school with strong connections to local families and comprehensive programs.',
      features: ['Community Focus', 'Family Connections', 'Comprehensive Programs', 'Supportive Environment']
    },
    {
      name: 'Clyde South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Clyde',
      address: '35-37 Evans Road, Clyde 3978',
      phone: '(03) 5998 0000',
      email: 'clydesouth.ps@education.vic.gov.au',
      enrolments: '350',
      ratio: '1:13',
      description: 'Growing primary school serving the developing Clyde South area with modern facilities.',
      features: ['Modern Facilities', 'Growing Community', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Officer North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Officer',
      address: '25-27 Officer Road, Officer 3809',
      phone: '(03) 5941 0000',
      email: 'officernorth.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Modern primary school serving the growing Officer North area with contemporary facilities.',
      features: ['Modern Facilities', 'Growing Area', 'Contemporary Programs', 'Comprehensive Education']
    },
    {
      name: 'Pakenham East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '35-37 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenhameast.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Established primary school serving the Pakenham East area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Support']
    },
    {
      name: 'Emerald North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Emerald',
      address: '15-17 Emerald-Monbulk Road, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'emeraldnorth.ps@education.vic.gov.au',
      enrolments: '300',
      ratio: '1:12',
      description: 'Small rural primary school with emphasis on nature-based learning and environmental education.',
      features: ['Small School', 'Rural Setting', 'Nature-based Learning', 'Environmental Education']
    },
    {
      name: 'Berwick South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '35-37 Berwick Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwicksouth.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Established primary school serving the Berwick South area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Cranbourne East North Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne East',
      address: '55-57 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeastnorth.ps@education.vic.gov.au',
      enrolments: '480',
      ratio: '1:15',
      description: 'Modern primary school serving the Cranbourne East North area with contemporary facilities.',
      features: ['Modern Facilities', 'Contemporary Programs', 'Comprehensive Education', 'Student Achievement']
    },
    {
      name: 'Narre Warren West Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '35-37 Webb Street, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'narrewarrenwest.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Established primary school serving the Narre Warren West area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Support']
    },
    {
      name: 'Hampton Park West Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Hampton Park',
      address: '35-37 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 7777',
      email: 'hamptonparkwest.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Established primary school serving the Hampton Park West area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Achievement']
    },
    {
      name: 'Endeavour Hills South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Endeavour Hills',
      address: '45-47 Matthew Flinders Avenue, Endeavour Hills 3802',
      phone: '(03) 9700 5055',
      email: 'endeavourhillssouth.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:14',
      description: 'Established primary school serving the Endeavour Hills South area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Support']
    },
    {
      name: 'Clyde North East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Clyde North',
      address: '45-47 Evans Road, Clyde North 3978',
      phone: '(03) 5998 0000',
      email: 'clydenortheast.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Modern primary school serving the growing Clyde North East area with contemporary facilities.',
      features: ['Modern Facilities', 'Growing Area', 'Contemporary Programs', 'Comprehensive Education']
    },
    {
      name: 'Officer South Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Officer',
      address: '35-37 Officer Road, Officer 3809',
      phone: '(03) 5941 0000',
      email: 'officersouth.ps@education.vic.gov.au',
      enrolments: '400',
      ratio: '1:14',
      description: 'Modern primary school serving the growing Officer South area with contemporary facilities.',
      features: ['Modern Facilities', 'Growing Area', 'Contemporary Programs', 'Comprehensive Education']
    },
    {
      name: 'Pakenham West Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '45-47 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenhamwest.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Established primary school serving the Pakenham West area with comprehensive programs.',
      features: ['Established History', 'Community Focus', 'Comprehensive Programs', 'Student Support']
    },
    // SECONDARY SCHOOLS
    {
      name: 'Berwick Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '25-27 Berwick Secondary Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwick.sc@education.vic.gov.au',
      enrolments: '1,200',
      ratio: '1:12',
      description: 'Large, comprehensive secondary school with excellent academic results and extensive extracurricular programs. Outstanding VCE results.',
      features: ['VCE Excellence', 'Music Academy', 'Sports Academy', 'Wellbeing Support'],
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80'
    },
    {
      name: 'Nossal High School',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '12-14 Nossal Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'nossal.hs@education.vic.gov.au',
      enrolments: '800',
      ratio: '1:11',
      description: 'Selective entry school with focus on academic excellence and STEM education. Strong university pathways for gifted students.',
      features: ['Selective Entry', 'STEM Academy', 'University Pathways', 'Academic Excellence'],
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80'
    },
    {
      name: 'Cranbourne Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne',
      address: '25-27 Cranbourne Secondary Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourne.sc@education.vic.gov.au',
      enrolments: '1,100',
      ratio: '1:13',
      description: 'Comprehensive secondary school with strong community connections and diverse programs. Well-rounded VCE, VCAL and VET programs.',
      features: ['VCE Programs', 'Music Excellence', 'Arts Programs', 'Community Connections'],
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80'
    },
    {
      name: 'Cranbourne East Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeast.sc@education.vic.gov.au',
      enrolments: '900',
      ratio: '1:12',
      description: 'Modern school with excellent facilities and comprehensive programs. Strong focus on technology integration and STEM learning.',
      features: ['STEM Excellence', 'Performing Arts', 'Modern Facilities', 'Technology Focus'],
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80'
    },
    {
      name: 'Pakenham Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Pakenham',
      address: '25-27 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenham.sc@education.vic.gov.au',
      enrolments: '1,200',
      ratio: '1:12',
      description: 'Large, comprehensive secondary school with excellent academic results and extensive programs. Outstanding VCE results and music program.',
      features: ['VCE Excellence', 'Music Programs', 'Arts Excellence', 'Wellbeing Support'],
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80'
    },
    {
      name: 'Lakeside College',
      type: 'combined',
      levels: 'Prep - Year 12',
      suburb: 'Pakenham',
      address: '12-14 Lakeside Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'lakeside.college@education.vic.gov.au',
      enrolments: '620',
      ratio: '1:12',
      description: 'Combined primary and secondary school with comprehensive programs. Unique Prep-12 approach providing educational continuity.',
      features: ['P-12 Continuity', 'VCE Programs', 'Music Excellence', 'Community Focus'],
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    },
    {
      name: 'Emerald Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Emerald',
      address: '8-10 Emerald-Monbulk Road, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'emerald.sc@education.vic.gov.au',
      enrolments: '650',
      ratio: '1:11',
      description: 'Rural school with emphasis on environmental education and community connections. Unique rural setting with environmental focus.',
      features: ['Environmental Education', 'Community Connections', 'Rural Setting', 'Sustainability Focus'],
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80'
    },
    {
      name: 'Koo Wee Rup Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Koo Wee Rup',
      address: '15-17 Koo Wee Rup Road, Koo Wee Rup 3981',
      phone: '(03) 5997 0000',
      email: 'kooweerup.sc@education.vic.gov.au',
      enrolments: '950',
      ratio: '1:12',
      description: 'Comprehensive secondary school with strong community connections and diverse programs. Well-rounded education with community focus.',
      features: ['VCE Programs', 'Music Excellence', 'Arts Programs', 'Community Focus'],
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80'
    },
    {
      name: 'Alkira Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne North',
      address: '2-50 Siding Avenue, Cranbourne North 3977',
      phone: '(03) 5991 3500',
      email: 'alkira.sc@education.vic.gov.au',
      enrolments: '1,100',
      ratio: '1:13',
      description: 'Modern secondary college established in 2009, offering comprehensive VCE, VCAL and VET programs. Strong focus on student wellbeing and academic achievement.',
      features: ['VCE Programs', 'VCAL Programs', 'VET Programs', 'Modern Facilities', 'Wellbeing Support'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'
    },
    {
      name: 'Fountain Gate Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Narre Warren',
      address: '10 Overland Drive, Narre Warren 3805',
      phone: '(03) 9704 5566',
      email: 'fountaingate.sc@education.vic.gov.au',
      enrolments: '1,000',
      ratio: '1:13',
      description: 'Comprehensive secondary school serving the Narre Warren community. Diverse curriculum with strong emphasis on student engagement and achievement.',
      features: ['VCE Programs', 'VCAL Programs', 'Arts Programs', 'Sports Programs', 'Community Connections'],
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80'
    },
    {
      name: 'Gleneagles Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Endeavour Hills',
      address: '85 Gleneagles Drive, Endeavour Hills 3802',
      phone: '(03) 9700 5055',
      email: 'gleneagles.sc@education.vic.gov.au',
      enrolments: '850',
      ratio: '1:12',
      description: 'Established secondary college with strong academic programs and comprehensive student support services. Focus on preparing students for future pathways.',
      features: ['VCE Programs', 'VCAL Programs', 'VET Programs', 'Wellbeing Support', 'Career Guidance'],
      image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&q=80'
    },
    {
      name: 'Kambrya College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '2-50 Kambrya Circuit, Berwick 3806',
      phone: '(03) 9707 3111',
      email: 'kambrya.co@education.vic.gov.au',
      enrolments: '1,300',
      ratio: '1:13',
      description: 'Large comprehensive secondary college with excellent facilities and diverse programs. Strong focus on academic excellence and student leadership.',
      features: ['VCE Excellence', 'VCAL Programs', 'VET Programs', 'Leadership Programs', 'Sports Academy'],
      image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b38?w=800&q=80'
    },
    {
      name: 'Narre Warren South P-12 College',
      type: 'combined',
      levels: 'Prep - Year 12',
      suburb: 'Narre Warren South',
      address: '100-150 Fox Road, Narre Warren South 3805',
      phone: '(03) 9704 3333',
      email: 'narrewarrensouth.p12@education.vic.gov.au',
      enrolments: '1,500',
      ratio: '1:14',
      description: 'Large P-12 college providing continuous education from Prep through to Year 12. Comprehensive programs and modern facilities supporting all year levels.',
      features: ['P-12 Continuity', 'VCE Programs', 'VCAL Programs', 'Modern Facilities', 'Comprehensive Programs'],
      image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80'
    },
    {
      name: 'Officer Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Officer',
      address: '1 Parker Street, Officer 3809',
      phone: '(03) 5942 4000',
      email: 'officer.sc@education.vic.gov.au',
      enrolments: '800',
      ratio: '1:12',
      description: 'Modern secondary college serving the growing Officer community. Innovative teaching practices and strong focus on student engagement and achievement.',
      features: ['VCE Programs', 'VCAL Programs', 'VET Programs', 'Modern Facilities', 'Innovative Teaching'],
      image: 'https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=800&q=80'
    },
    {
      name: 'Hampton Park Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Hampton Park',
      address: '15-25 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 7777',
      email: 'hamptonpark.sc@education.vic.gov.au',
      enrolments: '900',
      ratio: '1:13',
      description: 'Comprehensive secondary college with strong community connections. Diverse programs catering to varied student interests and career pathways.',
      features: ['VCE Programs', 'VCAL Programs', 'VET Programs', 'Community Connections', 'Diverse Programs'],
      image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80'
    },
    {
      name: 'St Francis Xavier College - Beaconsfield Campus',
      type: 'secondary',
      levels: 'Year 10 - Year 12',
      suburb: 'Beaconsfield',
      address: '4 Beaconsfield Avenue, Beaconsfield 3807',
      phone: '(03) 9707 3111',
      email: 'info@sfx.vic.edu.au',
      enrolments: '600',
      ratio: '1:12',
      description: 'Catholic co-educational secondary school. Senior campus offering Years 10-12 with strong academic programs and faith-based education.',
      features: ['Catholic Education', 'VCE Programs', 'Faith-based', 'Academic Excellence', 'Senior Campus'],
      image: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&q=80'
    },
    {
      name: 'St Francis Xavier College - Berwick Campus',
      type: 'secondary',
      levels: 'Year 7 - Year 9',
      suburb: 'Berwick',
      address: '75 Ridgemont Drive, Berwick 3806',
      phone: '(03) 9707 3111',
      email: 'info@sfx.vic.edu.au',
      enrolments: '800',
      ratio: '1:12',
      description: 'Catholic co-educational secondary school. Junior campus offering Years 7-9 with comprehensive programs and strong pastoral care.',
      features: ['Catholic Education', 'Junior Campus', 'Faith-based', 'Pastoral Care', 'Comprehensive Programs'],
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80'
    },
    {
      name: 'St Francis Xavier College - Officer Campus',
      type: 'secondary',
      levels: 'Year 7 - Year 9',
      suburb: 'Officer',
      address: '21 Majestic Drive, Officer 3809',
      phone: '(03) 9707 3111',
      email: 'info@sfx.vic.edu.au',
      enrolments: '700',
      ratio: '1:12',
      description: 'Catholic co-educational secondary school. Junior campus serving the growing Officer community with faith-based education and modern facilities.',
      features: ['Catholic Education', 'Junior Campus', 'Faith-based', 'Modern Facilities', 'Growing Community'],
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80'
    },
    {
      name: 'St Peter\'s College - Cranbourne Campus',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne',
      address: '55 Kangan Drive, Cranbourne 3977',
      phone: '(03) 5990 7777',
      email: 'info@stpeters.vic.edu.au',
      enrolments: '1,200',
      ratio: '1:13',
      description: 'Catholic co-educational secondary school offering comprehensive education from Years 7-12. Strong academic programs and faith-based values.',
      features: ['Catholic Education', 'VCE Programs', 'Faith-based', 'Academic Excellence', 'Comprehensive Programs'],
      image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&q=80'
    },
    {
      name: 'St Peter\'s College - Clyde North Campus',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Clyde North',
      address: '55 Kangan Drive, Clyde North 3978',
      phone: '(03) 5990 7777',
      email: 'info@stpeters.vic.edu.au',
      enrolments: '1,000',
      ratio: '1:13',
      description: 'Catholic co-educational secondary school serving the Clyde North community. Modern facilities and comprehensive programs with faith-based education.',
      features: ['Catholic Education', 'VCE Programs', 'Faith-based', 'Modern Facilities', 'Comprehensive Programs'],
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80'
    },
    {
      name: 'Casey Grammar School',
      type: 'secondary',
      levels: 'Prep - Year 12',
      suburb: 'Cranbourne East',
      address: '3 New Holland Drive, Cranbourne East 3977',
      phone: '(03) 5991 0800',
      email: 'info@caseygrammar.vic.edu.au',
      enrolments: '850',
      ratio: '1:12',
      description: 'Independent co-educational school offering Prep through Year 12. Strong academic focus with comprehensive programs and modern facilities.',
      features: ['Independent School', 'P-12 Continuity', 'VCE Programs', 'Academic Excellence', 'Modern Facilities'],
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80'
    },
    {
      name: 'Maranatha Christian School',
      type: 'secondary',
      levels: 'Prep - Year 12',
      suburb: 'Officer',
      address: '62 Rix Road, Officer 3809',
      phone: '(03) 5943 2000',
      email: 'info@maranatha.vic.edu.au',
      enrolments: '600',
      ratio: '1:12',
      description: 'Independent Christian co-educational school offering Prep through Year 12. Faith-based education with strong academic programs and community focus.',
      features: ['Christian Education', 'P-12 Continuity', 'VCE Programs', 'Faith-based', 'Community Focus'],
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80'
    },
    {
      name: 'Beaconhills College',
      type: 'secondary',
      levels: 'Prep - Year 12',
      suburb: 'Pakenham',
      address: '30-34 Toomuc Valley Road, Pakenham 3810',
      phone: '(03) 5945 3000',
      email: 'info@beaconhills.vic.edu.au',
      enrolments: '1,800',
      ratio: '1:13',
      description: 'Independent Anglican co-educational school offering Prep through Year 12. Large school with comprehensive programs and excellent facilities.',
      features: ['Anglican Education', 'P-12 Continuity', 'VCE Programs', 'Comprehensive Programs', 'Excellent Facilities'],
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80'
    },
    {
      name: 'Chairo Christian School',
      type: 'secondary',
      levels: 'Prep - Year 12',
      suburb: 'Pakenham',
      address: '585 Bald Hill Road, Pakenham 3810',
      phone: '(03) 5941 5511',
      email: 'info@chairo.vic.edu.au',
      enrolments: '1,200',
      ratio: '1:13',
      description: 'Independent Christian co-educational school offering Prep through Year 12. Faith-based education with strong academic programs and pastoral care.',
      features: ['Christian Education', 'P-12 Continuity', 'VCE Programs', 'Faith-based', 'Pastoral Care'],
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80'
    },
    {
      name: 'Waverley Christian College',
      type: 'secondary',
      levels: 'Prep - Year 12',
      suburb: 'Narre Warren South',
      address: '315-335 Police Road, Narre Warren South 3805',
      phone: '(03) 9701 1900',
      email: 'info@waverley.vic.edu.au',
      enrolments: '1,500',
      ratio: '1:13',
      description: 'Independent Christian co-educational school offering Prep through Year 12. Large school with comprehensive programs and strong community connections.',
      features: ['Christian Education', 'P-12 Continuity', 'VCE Programs', 'Faith-based', 'Strong Community'],
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    }
  ];

  // Get suburbs with school counts
  const suburbsData = schools.reduce((acc, school) => {
    if (!acc[school.suburb]) {
      acc[school.suburb] = 0;
    }
    acc[school.suburb]++;
    return acc;
  }, {} as { [key: string]: number });
  
  const suburbs = Object.keys(suburbsData).sort();
  
  // Get all unique features
  const allFeatures = Array.from(new Set(schools.flatMap(school => school.features))).sort();
  
  // Common features for quick filters
  const commonFeatures = [
    'STEM Excellence',
    'Music Excellence', 
    'Arts Programs',
    'Sports Academy',
    'Small Classes',
    'Environmental Education',
    'Performing Arts',
    'Community Focus'
  ].filter(feature => allFeatures.includes(feature));

  const filteredSchools = schools.filter(school => {
    const typeMatch = selectedType === 'all' || school.type === selectedType;
    const levelsMatch = selectedLevels === 'all' ||
                        (selectedLevels === 'early-years' && school.type === 'kindergarten') ||
                        (selectedLevels === 'primary' && (school.type === 'primary' || school.type === 'combined')) ||
                        (selectedLevels === 'secondary' && (school.type === 'secondary' || school.type === 'combined'));
    const suburbMatch = selectedSuburb === 'all' || school.suburb === selectedSuburb;
    const searchMatch = searchQuery === '' || 
                       school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       school.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       school.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       school.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Feature match - school must have ALL selected features
    const featureMatch = selectedFeatures.length === 0 || 
                        selectedFeatures.every(feature => school.features.includes(feature));
    
    // Size match based on enrollment
    const sizeMatch = selectedSize === 'all' || 
                     (selectedSize === 'small' && school.enrolments && parseInt(school.enrolments) <= 300) ||
                     (selectedSize === 'medium' && school.enrolments && parseInt(school.enrolments) > 300 && parseInt(school.enrolments) <= 600) ||
                     (selectedSize === 'large' && school.enrolments && parseInt(school.enrolments) > 600) ||
                     (selectedSize === 'na' && (!school.enrolments || school.enrolments === 'N/A'));
    
    return typeMatch && levelsMatch && suburbMatch && searchMatch && featureMatch && sizeMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'suburb':
        return a.suburb.localeCompare(b.suburb);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'enrolments':
        const aEnrolments = parseInt(a.enrolments || '0');
        const bEnrolments = parseInt(b.enrolments || '0');
        return bEnrolments - aEnrolments;
      default:
        return 0;
    }
  });

  const getTypeColor = (type: string) => {
    // on.com style - all black badges
    return '#000';
  };

  const getTypeIcon = (type: string) => {
    // Clean on.com style - no symbols
    return '';
  };

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '80px' : '120px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section - on.com style */}
        <section style={{
          padding: isMobile ? '60px 20px 40px' : '80px max(2rem, 3.33vw) 60px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '42px' : '72px',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              margin: '0 0 20px 0',
              color: '#000'
            }}>
              Schools Guide
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 0 48px 0',
              lineHeight: '1.6'
            }}>
              Comprehensive guide to kindergartens, primary and secondary schools in Melbourne's south-east
            </p>
            <div style={{
              display: 'flex',
              gap: isMobile ? '24px' : '48px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.filter(s => s.type === 'kindergarten').length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Kindergartens</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.filter(s => s.type === 'primary').length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Primary</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.filter(s => s.type === 'secondary').length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Secondary</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Total</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '32px',
              color: '#000'
            }}>
              Find Schools
            </h2>
            
            {/* Quick Filters - on.com style */}
            <div style={{
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Quick Filters
              </h3>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {[
                  { label: 'Selective Entry', filter: () => { setSearchQuery('selective'); } },
                  { label: 'Music Programs', filter: () => { setSelectedFeatures(['Music Excellence']); setShowAdvancedFilters(true); } },
                  { label: 'STEM Focus', filter: () => { setSelectedFeatures(['STEM Excellence']); setShowAdvancedFilters(true); } },
                  { label: 'Environmental', filter: () => { setSelectedFeatures(['Environmental Education']); setShowAdvancedFilters(true); } },
                  { label: 'Sports Academy', filter: () => { setSelectedFeatures(['Sports Academy']); setShowAdvancedFilters(true); } },
                  { label: 'Small Classes', filter: () => { setSelectedFeatures(['Small Classes']); setShowAdvancedFilters(true); } },
                ].map((quick, idx) => (
                  <button
                    key={idx}
                    onClick={quick.filter}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #e5e5e5',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    {quick.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Bar - on.com style */}
            <div style={{
              marginBottom: '32px'
            }}>
              <div style={{
                position: 'relative',
                maxWidth: '600px'
              }}>
                <input
                  type="text"
                  placeholder="Search schools by name, suburb, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 24px 16px 50px',
                    fontSize: '16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#000';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5';
                    e.target.style.backgroundColor = '#fff';
                  }}
                />
                <svg
                  style={{
                    position: 'absolute',
                    left: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#666'
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>

            {/* Filters - on.com style */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '16px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>School Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="kindergarten">Kindergartens</option>
                  <option value="primary">Primary Schools</option>
                  <option value="secondary">Secondary Schools</option>
                  <option value="combined">Combined Schools</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Year Levels</label>
                <select
                  value={selectedLevels}
                  onChange={(e) => setSelectedLevels(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
                  }}
                >
                  <option value="all">All Levels</option>
                  <option value="early-years">Early Years (3-4)</option>
                  <option value="primary">Primary (Prep-6)</option>
                  <option value="secondary">Secondary (7-12)</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Suburb</label>
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
                  }}
                >
                  <option value="all">All Suburbs ({schools.length} schools)</option>
                  {suburbs.map(suburb => (
                    <option key={suburb} value={suburb}>
                      {suburb} ({suburbsData[suburb]} {suburbsData[suburb] === 1 ? 'school' : 'schools'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
                  }}
                >
                  <option value="name">School Name</option>
                  <option value="suburb">Suburb</option>
                  <option value="type">School Type</option>
                  <option value="enrolments">Enrollment Size</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Toggle and Results Count - on.com style */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '24px',
              marginBottom: showAdvancedFilters ? '24px' : '0',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: showAdvancedFilters ? '#000' : '#fff',
                  color: showAdvancedFilters ? '#fff' : '#000',
                  border: '1px solid #e5e5e5',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!showAdvancedFilters) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showAdvancedFilters) {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                Advanced Filters
                {(selectedFeatures.length > 0 || selectedSize !== 'all') && (
                  <span style={{
                    backgroundColor: showAdvancedFilters ? '#fff' : '#000',
                    color: showAdvancedFilters ? '#000' : '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {selectedFeatures.length + (selectedSize !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#000'
                }}>
                  {filteredSchools.length} schools found
                </div>
                {(selectedType !== 'all' || selectedSuburb !== 'all' || selectedLevels !== 'all' ||
                  searchQuery !== '' || selectedFeatures.length > 0 || selectedSize !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedSuburb('all');
                      setSelectedLevels('all');
                      setSearchQuery('');
                      setSelectedFeatures([]);
                      setSelectedSize('all');
                      setShowAdvancedFilters(false);
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'transparent',
                      color: '#666',
                      border: '1px solid #e5e5e5',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters Panel - on.com style */}
            {showAdvancedFilters && (
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '16px',
                padding: '32px',
                marginTop: '0'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '32px'
                }}>
                  {/* School Size Filter */}
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      School Size
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px'
                    }}>
                      {[
                        { value: 'all', label: 'All Sizes' },
                        { value: 'small', label: 'Small (≤300)' },
                        { value: 'medium', label: 'Medium (300-600)' },
                        { value: 'large', label: 'Large (>600)' }
                      ].map(size => (
                        <label
                          key={size.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 16px',
                            backgroundColor: selectedSize === size.value ? '#000' : '#fff',
                            color: selectedSize === size.value ? '#fff' : '#000',
                            border: `1px solid ${selectedSize === size.value ? '#000' : '#e5e5e5'}`,
                            borderRadius: '100px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="radio"
                            name="schoolSize"
                            value={size.value}
                            checked={selectedSize === size.value}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            style={{ display: 'none' }}
                          />
                          {size.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Features Filter */}
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Special Programs & Features
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {commonFeatures.map(feature => (
                        <label
                          key={feature}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '10px 18px',
                            backgroundColor: selectedFeatures.includes(feature) ? '#000' : '#fff',
                            color: selectedFeatures.includes(feature) ? '#fff' : '#000',
                            border: `1px solid ${selectedFeatures.includes(feature) ? '#000' : '#e5e5e5'}`,
                            borderRadius: '100px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFeatures([...selectedFeatures, feature]);
                              } else {
                                setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                          {feature}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedFeatures.length > 0 || selectedSize !== 'all') && (
                  <div style={{
                    textAlign: 'right',
                    marginTop: '24px'
                  }}>
                    <button
                      onClick={() => {
                        setSelectedFeatures([]);
                        setSelectedSize('all');
                      }}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: '1px solid #e5e5e5',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.borderColor = '#e5e5e5';
                      }}
                    >
                      Clear Advanced Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Suburb Indicator - on.com style */}
          {selectedSuburb !== 'all' && (
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '16px',
              padding: '24px 32px',
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  {selectedSuburb}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  margin: 0
                }}>
                  {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} in this suburb
                </p>
              </div>
              <button
                onClick={() => setSelectedSuburb('all')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View All Suburbs
              </button>
            </div>
          )}

          {/* Suburbs Overview - on.com style */}
          {selectedSuburb === 'all' && searchQuery === '' && (
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '48px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Schools by Suburb
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {suburbs.map(suburb => {
                  const schoolsInSuburb = schools.filter(s => s.suburb === suburb);
                  const kindergartens = schoolsInSuburb.filter(s => s.type === 'kindergarten').length;
                  const primaries = schoolsInSuburb.filter(s => s.type === 'primary').length;
                  const secondaries = schoolsInSuburb.filter(s => s.type === 'secondary').length;
                  const combined = schoolsInSuburb.filter(s => s.type === 'combined').length;

                  return (
                    <div
                      key={suburb}
                      onClick={() => setSelectedSuburb(suburb)}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#000';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e5e5';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#000'
                      }}>
                        {suburb}
                      </h4>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#000',
                        marginBottom: '12px',
                        letterSpacing: '-0.02em'
                      }}>
                        {suburbsData[suburb]}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        lineHeight: '1.8'
                      }}>
                        {kindergartens > 0 && <div>{kindergartens} Kindergarten{kindergartens > 1 ? 's' : ''}</div>}
                        {primaries > 0 && <div>{primaries} Primary</div>}
                        {secondaries > 0 && <div>{secondaries} Secondary</div>}
                        {combined > 0 && <div>{combined} Combined</div>}
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        View →
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Schools Results Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Schools Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '80px'
          }}>
            {filteredSchools.map((school, idx) => (
              <Link 
                key={idx}
                href={`/school/${school.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: 'fit-content',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* School Image */}
                  <div style={{
                    width: '100%',
                    height: '320px',
                    backgroundColor: '#f8f8f8',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={school.image || `https://images.unsplash.com/photo-${school.type === 'kindergarten' ? '1607696421817-0e94b57e2e2e?w=800&q=80' : school.type === 'primary' ? '1580582932707-520aed937b7b?w=800&q=80' : '1523050854a4c978d-8df90110c9f1?w=800&q=80'}`}
                      alt={school.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '6px 12px',
                      backgroundColor: getTypeColor(school.type),
                      color: '#fff',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {school.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: '32px',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* School Name and Location */}
                    <div style={{
                      marginBottom: '16px'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        margin: '0 0 8px 0',
                        color: '#000',
                        lineHeight: '1.3'
                      }}>
                        {school.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: '0 0 4px 0'
                      }}>
                        {school.suburb}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#000',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        {school.levels}
                      </p>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      marginBottom: '20px',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1
                    }}>
                      {school.description}
                    </p>

                    {/* Key Stats - on.com style */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                      padding: '16px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '12px'
                    }}>
                      {school.enrolments && school.enrolments !== 'N/A' && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#000'
                          }}>
                            {school.enrolments}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666'
                          }}>
                            Students
                          </div>
                        </div>
                      )}
                      {school.ratio && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#000'
                          }}>
                            {school.ratio}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666'
                          }}>
                            Ratio
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Features - on.com style */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      marginBottom: '24px'
                    }}>
                      {school.features.slice(0, 3).map((feature, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '100px',
                            fontSize: '11px',
                            color: '#000',
                            fontWeight: '500'
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                      {school.features.length > 3 && (
                        <span style={{
                          padding: '6px 12px',
                          fontSize: '11px',
                          color: '#666',
                          fontWeight: '500'
                        }}>
                          +{school.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View More Button - on.com style */}
                    <div style={{
                      paddingTop: '20px',
                      borderTop: '1px solid #f0f0f0',
                      textAlign: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '15px',
                        color: '#000',
                        fontWeight: '600'
                      }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Enrollment Information - ON.com Layout Style */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '80px 20px' : '120px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '80px',
              alignItems: 'center',
              marginBottom: '80px'
            }}>
              {/* Left Content */}
              <div>
                <h2 style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  lineHeight: '1.1',
                  marginBottom: '32px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  School Enrollment Information
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  Important enrollment dates and requirements for schools in Casey and Cardinia Shires. Understanding the enrollment process is crucial for securing your child's place in their preferred school.
                </p>
                <div style={{
                  marginBottom: '40px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Key Enrollment Dates
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {[
                      'Kindergarten: June 30 for following year',
                      'Primary School: Term 2 for following year',
                      'Secondary School: May-August enrollment period',
                      'Private Schools: Often 12+ months in advance'
                    ].map((item, idx) => (
                      <li key={idx} style={{
                        fontSize: '16px',
                        color: '#666',
                        marginBottom: '12px',
                        paddingLeft: '20px',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          color: '#000',
                          fontWeight: '600'
                        }}>-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Visual - on.com style */}
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                backgroundColor: '#f5f5f5',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  <svg
                    style={{ width: '64px', height: '64px', marginBottom: '24px' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h4 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '16px'
                  }}>
                    Plan Ahead
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    Early enrollment ensures your child secures their place in your preferred school
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Cards Grid */}

            {/* Enhanced Cards Grid - on.com style */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px',
              marginTop: '48px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  fontWeight: '700',
                  color: '#000'
                }}>01</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Kindergarten Enrollment
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.7',
                  textAlign: 'left'
                }}>
                  <p><strong>Deadline:</strong> 30 June for following year</p>
                  <p><strong>Registration:</strong> Online through Council websites</p>
                  <p><strong>Required:</strong> Birth certificate, proof of address, immunization records</p>
                  <p><strong>Casey:</strong> (03) 9705 5200</p>
                  <p><strong>Cardinia:</strong> (03) 5941 0000</p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  fontWeight: '700',
                  color: '#000'
                }}>02</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Primary School Enrollment
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.7',
                  textAlign: 'left'
                }}>
                  <p><strong>Enrollment Period:</strong> Usually Term 2 for following year</p>
                  <p><strong>Contact:</strong> Direct contact with school</p>
                  <p><strong>Required:</strong> Birth certificate, proof of address, immunization records</p>
                  <p><strong>School Zones:</strong> Check with individual schools for catchment areas</p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  fontWeight: '700',
                  color: '#000'
                }}>03</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Secondary School Enrollment
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.7',
                  textAlign: 'left'
                }}>
                  <p><strong>Enrollment Period:</strong> Usually Term 2 for following year</p>
                  <p><strong>Contact:</strong> Direct contact with school</p>
                  <p><strong>Required:</strong> Birth certificate, proof of address, immunization records, previous school reports</p>
                  <p><strong>Special Entry:</strong> Some schools have selective entry requirements</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Property Search CTA - on.com style dark section */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: isMobile ? '80px 20px' : '100px max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Looking for Properties Near Great Schools?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.85,
              lineHeight: '1.6',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Search properties by school zone to find your perfect family home in the right catchment area.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/buy"
                style={{
                  display: 'flex',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Search by School Zone
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SchoolsGuidePage;