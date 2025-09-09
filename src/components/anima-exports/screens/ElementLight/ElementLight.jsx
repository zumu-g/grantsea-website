import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Component } from "../../components/Component";
import { Component4 } from "../../components/Component4";
import { Component5 } from "../../components/Component5";
import { Component6 } from "../../components/Component6";
import { Component7 } from "../../components/Component7";
import { Component8 } from "../../components/Component8";
import { Component9 } from "../../components/Component9";
import { Component10 } from "../../components/Component10";
import { Component11 } from "../../components/Component11";
import { Component12 } from "../../components/Component12";
import { VariantHoverTrueWrapper } from "../../components/VariantHoverTrueWrapper";
import { Component1_5 } from "../../icons/Component1_5";
import { Component1_6 } from "../../icons/Component1_6";
import { Component1_13 } from "../../icons/Component1_13";
import { Component1_59 } from "../../icons/Component1_59";
import { Component1_60 } from "../../icons/Component1_60";
import { Component1_91 } from "../../icons/Component1_91";
import { Component1_92 } from "../../icons/Component1_92";
import { Component1_96 } from "../../icons/Component1_96";
import { Component1_98 } from "../../icons/Component1_98";
import { Component1_39 } from "../../icons/Component1_39";
import { Component1_20 } from "../../icons/Component1_20";
import { Variant9 } from "../../icons/Variant9";
import { Component1_51 } from "../../icons/Component1_51";
import { Variant1 } from "../../icons/Variant1";
import { Variant11 } from "../../icons/Variant11";
import { Variant25 } from "../../icons/Variant25";
import { useProperties } from "@/hooks/useProperties";
import { formatPrice } from "@/services/api";
import SavePropertyButton from "@/components/SavePropertyButton";
import "./style.css";
import "./navigation-override.css";
import "./on-style-header.css";
import "./on-com-safe-overrides.css";
import "./hero-text-fix.css";

export const ElementLight = () => {
  // Scroll state for header
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Carousel state for New Arrivals
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  // Get properties from API - get both sale and lease properties
  const { properties: apiProperties, loading, error } = useProperties({ limit: 8, type: 'all' });
  
  // Fallback mock data in case API fails
  // Mock data removed - only use API data
  const mockProperties = []; // Empty array to prevent any mock data usage
  
  /* Original mock data commented out:
  const mockProperties = [
    {
      id: 1,
      address: "42 Rosewood Avenue, Berwick",
      description: "Prized family home on 700sqm",
      details: "4 bed, 2 bath, 2 garage",
      price: "$850,000 - $900,000",
      tag: "NEW"
    },
    {
      id: 2,
      address: "15 Lakeside Drive, Narre Warren",
      description: "Modern lakefront masterpiece",
      details: "5 bed, 3 bath, 3 garage",
      price: "$1,250,000 - $1,350,000",
      tag: "LUXURY"
    },
    {
      id: 3,
      address: "8 Heritage Court, Pakenham",
      description: "Spacious family entertainer",
      details: "4 bed, 2 bath, 2 garage",
      price: "$720,000 - $780,000",
      tag: "NEW"
    },
    {
      id: 4,
      address: "23 Parkview Terrace, Officer",
      description: "Contemporary townhouse living",
      details: "3 bed, 2 bath, 1 garage",
      price: "$650,000 - $700,000",
      tag: "NEW PRICE"
    }
  ];
  */
  
  // Only use API data - no fallback to mock
  const properties = apiProperties;

  const nextProperty = () => {
    if (properties.length > 0) {
      setCurrentPropertyIndex((prev) => (prev + 1) % properties.length);
    }
  };

  const prevProperty = () => {
    if (properties.length > 0) {
      setCurrentPropertyIndex((prev) => (prev - 1 + properties.length) % properties.length);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getVisibleProperties = () => {
    if (properties.length === 0) return [];
    const visible = [];
    for (let i = 0; i < Math.min(4, properties.length); i++) {
      const index = (currentPropertyIndex + i) % properties.length;
      visible.push(properties[index]);
    }
    return visible;
  };

  return (
    <div className="element-light">
      <div className="overlap-group">
        <div className="container-4">
          <header className={`header ${isScrolled ? 'scrolled' : ''}`} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            padding: '20px 40px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Logo - positioned on left */}
            <div style={{ position: 'absolute', left: '40px' }}>
              <Variant1 style={{ width: '64px', height: '64px' }} />
            </div>
            
            {/* Center Navigation */}
            <nav style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '48px',
              margin: '0 auto',
              paddingTop: '10px'
            }}>
              <Link href="/search" style={{ 
                textDecoration: 'none', 
                color: '#1a1a1a',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.5px',
                transition: 'color 0.2s'
              }}>Search</Link>
              
              <Link href="/about" style={{ 
                textDecoration: 'none', 
                color: '#1a1a1a',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.5px',
                transition: 'color 0.2s'
              }}>About</Link>
              
              <Link href="/explore" style={{ 
                textDecoration: 'none', 
                color: '#1a1a1a',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.5px',
                transition: 'color 0.2s'
              }}>Explore</Link>
            </nav>
            
            {/* Right Icons */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px',
              paddingTop: '10px'
            }}>
              {/* Search icon */}
              <button 
                onClick={() => setShowSearchModal(true)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Component1_39 style={{ width: '20px', height: '20px' }} />
              </button>
              
              {/* Heart Icon for Saved Properties */}
              <Link href="/saved-properties" style={{ 
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              
              {/* User/Profile icon */}
              <Link href="/profile" style={{ 
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Component1_20 style={{ width: '20px', height: '20px' }} />
              </Link>
              
              {/* Menu icon */}
              <button style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Variant9 style={{ width: '24px', height: '24px' }} />
              </button>
            </div>
          </header>
        </div>

        <div className="section-main">
          <div className="section-article">

            <div className="container-9">
              <div className="gradient-2" />

              <div className="div-wrapper-3">
                <div className="section-wrapper">
                  <div className="section">
                    <div className="div-2">
                      <div className="text-wrapper-2">Your best move</div>
                    </div>

                    <div className="div-2">
                      <p className="p">Casey and Cardinia's finest homes</p>
                    </div>

                    <div className="container-10">
                      <div className="item-wrapper">
                        <div className="item">
                          <VariantHoverTrueWrapper
                            className="component-3"
                            containerClassName="component-instance"
                            text="Buy Property"
                            variant="one"
                          />
                        </div>
                      </div>

                      <div className="item-margin-2">
                        <div className="item">
                          <VariantHoverTrueWrapper
                            className="component-3"
                            containerClassName="component-instance"
                            text="Sell Property"
                            variant="one"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-section" style={{ position: 'relative', paddingBottom: '40px' }}>

            <div className="div-wrapper-3">
              <div className="text-wrapper-3">Browse by category</div>
            </div>

            <div className="container-11">
              <Component4
                className="component-4-instance"
                component186StyleOverrideClassName="design-component-instance-node"
                hover={false}
                text="Buy"
                variant="one"
              />
              <Component4
                className="component-4-instance"
                component186StyleOverrideClassName="design-component-instance-node"
                hover={false}
                text="Lease"
                variant="two"
              />
              <Component4
                className="component-4-instance"
                component186StyleOverrideClassName="design-component-instance-node"
                hover={false}
                text="Appraisal"
                variant="three"
              />
            </div>
          </div>

          <div className="section-2">
            <div className="container-12">
              <div className="heading-margin">
                <div className="div-2">
                  <div className="activities">SERVICES</div>
                </div>
              </div>

              <div className="list">
                <div className="div-2">
                  <Component5
                    className="component-5-instance"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text="I'm looking to buy"
                    variant="one"
                  />
                </div>

                <div className="div-2">
                  <Component5
                    className="component-13"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text="I'm looking to sell"
                    variant="one"
                  />
                </div>

                <div className="div-2">
                  <Component5
                    className="component-14"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text="I need a property manager"
                    variant="one"
                  />
                </div>

                <div className="div-2">
                  <Component5
                    className="component-15"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text="Suburb updates"
                    variant="one"
                  />
                </div>

                <div className="div-2">
                  <Component5
                    className="component-17"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text="I'm looking to lease"
                    textClassName="component-16"
                    variant="one"
                  />
                </div>


                <div className="div-2">
                  <Component5
                    className="component-14"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text=""
                    variant="one"
                  />
                </div>
              </div>
            </div>

            <img className="img" alt="Container" src="/anima/container.svg" />
          </div>

          {/* Updated Suburb Profiles Section */}
          <div className="section-section-2">
            <div className="container-13">
              <div className="group-margin">
                <div className="group">
                  <Component6
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Berwick"
                    variant="one"
                  />
                </div>
              </div>

              <div className="group-margin">
                <div className="group">
                  <Component6
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Narre Warren"
                    variant="two"
                  />
                </div>
              </div>

              <div className="group-margin">
                <div className="group">
                  <Component6
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Narre Warren South"
                    variant="three"
                  />
                </div>
              </div>

              <div className="group-margin">
                <div className="group">
                  <Component6
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Pakenham"
                    variant="four"
                  />
                </div>
              </div>

              <div className="group-margin">
                <div className="group">
                  <Component6
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Officer"
                    variant="five"
                  />
                </div>
              </div>

              <div className="group-margin">
                <div className="group">
                  <Component6
                    hover={false}
                    text={
                      <>
                        More suburbs
                        <br />
                        coming soon
                      </>
                    }
                    variant="six"
                  />
                </div>
              </div>

              <div className="group-margin-2" />
            </div>

            <div className="margin-3">
              <div className="container-14">
                <Component7
                  className="component-7-instance"
                  hover={false}
                  variant="one"
                  onClick={prevProperty}
                />
                <div className="button-next-slide">
                  <Component7
                    className="component-7-instance"
                    hover={false}
                    variant="two"
                    onClick={nextProperty}
                  />
                </div>

                <div className="horizontal-divider">
                  <div className="horizontal-divider-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Updated New Arrivals Section with Property Carousel */}
          <div className="section-new-arrivals">
            <div className="div-wrapper-3">
              <div className="text-wrapper-3">New Property Listings</div>
            </div>

            <div className="container-15">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid #f0f0f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <p style={{ marginTop: '20px', color: '#666' }}>Loading properties...</p>
                </div>
              ) : properties.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px', 
                  color: '#666',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  margin: '20px'
                }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>No Properties Available</h3>
                  <p>Please check back later or contact us for more information.</p>
                  {error && (
                    <p style={{ fontSize: '14px', color: '#dc2626', marginTop: '10px' }}>
                      Error: {error}
                    </p>
                  )}
                </div>
              ) : (
              <div className="container-16">
                {getVisibleProperties().map((property, index) => (
                  <div className="group-wrapper" key={`${property.id}-${index}`}>
                    <div className="article-wrapper">
                      <Link href={`/property/${property.id}`} className="article" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <div className="container-17" style={{ position: 'relative' }}>
                          <Component
                            className="component-14"
                            hover={false}
                            icon={<Variant11 className="icon-instance-node" />}
                            variant="four"
                          />
                          <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10 }}>
                            <SavePropertyButton property={property} />
                          </div>
                        </div>

                        <div className="container-wrapper-2">
                          <div className="container-18">
                            <div className="container-19">
                              <div className="picture-2" style={{
                                background: '#f0f0f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                cursor: 'pointer'
                              }}>
                                Property Image
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="div-3">
                          <div className="text-wrapper-4">{property.tag || (property.status === 'active' ? 'NEW' : property.status?.toUpperCase()) || 'NEW'}</div>

                          <div className="container-20">
                            <p className="text-wrapper-5">
                              {property.address}{property.suburb ? `, ${property.suburb}` : ''}
                            </p>
                          </div>

                          <div className="container-21">
                            <p className="text-wrapper-6">
                              {property.description || `${property.propertyType || 'Property'} in ${property.suburb || 'prime location'}`}
                            </p>
                          </div>

                          <div className="container-22">
                            <div className="text-wrapper-7">{property.details || `${property.bedrooms || 0} bed, ${property.bathrooms || 0} bath, ${property.carSpaces || 0} car`}</div>
                          </div>

                          <div className="container-23">
                            <div className="text-wrapper-7">
                              {property.listingType === 'lease' 
                                ? (property.leasePriceDisplay || property.leasePrice || 'Contact Agent')
                                : (property.priceDisplay || property.price || formatPrice(property.price))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}

                <img
                  className="group-margin-3"
                  alt="Group margin"
                  src="/static/img/group-5-10-margin.png"
                />

                <img
                  className="group-margin-3"
                  alt="Group margin"
                  src="/static/img/group-6-10-margin.png"
                />

                <img
                  className="group-margin-3"
                  alt="Group margin"
                  src="/static/img/group-7-10-margin.png"
                />

                <img
                  className="group-margin-3"
                  alt="Group margin"
                  src="/static/img/group-8-10-margin.png"
                />

                <img
                  className="group-margin-3"
                  alt="Group margin"
                  src="/static/img/group-9-10-margin.png"
                />

                <img
                  className="group-margin-4"
                  alt="Group margin"
                  src="/static/img/group-10-10-margin.png"
                />
              </div>
              )}

              <div className="margin-3">
                <div className="container-14">
                  <Component7
                    className="component-7-instance"
                    hover={false}
                    variant="one"
                    onClick={prevProperty}
                  />
                  <div className="button-next-slide">
                    <Component7
                      className="component-7-instance"
                      hover={false}
                      variant="two"
                      onClick={nextProperty}
                    />
                  </div>

                  <div className="horizontal-divider">
                    <div className="horizontal-divider-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-section-3">
            <div className="container-26">
              <div className="section-3">
                <div className="div-wrapper-3">
                  <div className="text-wrapper-3">Success Stories</div>
                </div>

                <div className="container-11">
                  <Component4
                    className="component-19"
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Recent sales"
                    variant="four"
                  />
                  <Component4
                    className="component-20"
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Happy clients"
                    variant="five"
                  />
                  <Component4
                    className="component-21"
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Market insights"
                    variant="six"
                  />
                  <Component4
                    className="component-22"
                    component186StyleOverrideClassName="design-component-instance-node"
                    hover={false}
                    text="Meet our team"
                    variant="seven"
                  />
                </div>
              </div>

              <div className="section-4">
                <div className="container-27">
                  <div className="div-2">
                    <div className="short-form-story" />
                  </div>

                  <div className="container-28">
                    <div className="section-5">
                      <div className="div-2">
                        <div className="text-wrapper-3">Our mission</div>
                      </div>

                      <div className="div-2">
                        <p className="text-wrapper-8">
                          Helping families find their perfect home
                        </p>
                      </div>
                    </div>

                    <div className="component-wrapper">
                      <Component8
                        className="component-8-instance"
                        text="Read more"
                        variant="one"
                      />
                    </div>
                  </div>
                </div>

                <div className="container-29">
                  <div className="div-wrapper-2">
                    <div className="container-30">
                      <div className="container-31">
                        <div className="group-margin">
                          <div className="group">
                            <div className="div-4">
                              <div className="container-32">
                                <div className="picture-short-form" />
                              </div>

                              <div className="gradient-3" />

                              <div className="container-33">
                                <div className="div-2">
                                  <div className="text-wrapper-9">
                                    Trusted by locals.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="group-margin">
                          <div className="group">
                            <div className="div-4">
                              <div className="container-32">
                                <div className="div-5" />
                              </div>

                              <div className="container-34">
                                <div className="div-2">
                                  <div className="text-wrapper-9">
                                    Expert market
                                    <br />
                                    knowledge.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="group-margin">
                          <div className="group">
                            <div className="div-4">
                              <div className="container-32">
                                <div className="picture-woman" />
                              </div>

                              <div className="gradient-3" />

                              <div className="container-35">
                                <div className="div-2">
                                  <p className="text-wrapper-9">
                                    We believe everyone
                                    <br />
                                    deserves to find their
                                    <br />
                                    dream home.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="group-margin">
                          <div className="group">
                            <div className="div-4">
                              <div className="container-32">
                                <div className="div-5" />
                              </div>

                              <div className="container-34">
                                <div className="div-2">
                                  <p className="text-wrapper-9">
                                    Whether that's your first
                                    <br />
                                    home or forever home…
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="group-margin-2" />

                        <div className="group-margin-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="section-6">
          <div className="container-36">
            <div className="div-2">
              <p className="stay-in-the-loop">
                Stay updated with new listings and market
                <br />
                insights from Grant's Estate Agents.
              </p>
            </div>

            <div className="div-2">
              <Component9 className="component-9-instance" variant="one" />
              <div className="label">
                <div className="text-wrapper-10">Email *</div>
              </div>
            </div>
          </div>
        </div>

        <div className="list-wrapper">
          <div className="list-2">
            <div className="item-link-help">
              <div className="component-12-wrapper">
                <Component12
                  className="component-14"
                  hover={false}
                  variant="eight"
                />
              </div>

              <div className="container-7">
                <div className="div-2">
                  <div className="help-support">Help &amp; support</div>
                </div>
              </div>
            </div>

            <div className="div-2">
              <div className="div-6">
                <div className="component-instance-wrapper">
                  <Component12
                    className="component-14"
                    hover={false}
                    variant="nine"
                  />
                </div>

                <div className="container-7">
                  <div className="div-2">
                    <div className="text-wrapper-11">Chat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-primary-footer-wrapper">
          <div className="div-7">
            <div className="div-2">
              <Component10
                className="component-14"
                text="Property alerts"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Market reports"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Selling guide"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Buying guide"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Our offices"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Client portal"
                variant="one"
              />
            </div>
          </div>
        </div>

        <div className="nav-secondary-footer-wrapper">
          <div className="div-7">
            <div className="div-2">
              <Component10
                className="component-14"
                text="About Grant's"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Careers"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Community"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Press &amp; media"
                variant="one"
              />
            </div>

            <div className="div-2">
              <Component10
                className="component-14"
                text="Blog"
                variant="one"
              />
            </div>
          </div>
        </div>

        <div className="section-7">
          <div className="div-6">
            <div className="margin-4">
              <div className="flag-of-australia-wrapper">
                <div className="flag-of-australia">
                  <Component
                    hover={false}
                    icon={<Component1_98 className="component-1-98" />}
                    variant="five"
                  />
                </div>
              </div>
            </div>

            <div className="container-37">
              <div className="text-wrapper-12">Australia</div>
            </div>
          </div>

          <div className="container-38">
            <div className="container-39">
              <div className="margin-5">
                <div className="container-40">
                  <div className="text-wrapper-13">© Grant's Estate Agents 2025</div>
                </div>
              </div>

              <div className="nav-utility-footer">
                <div className="list-3">
                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Terms &amp; conditions"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Privacy policy"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Accessibility"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Contact"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Sitemap"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-4" />

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Agency Agreement"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Commission Rates"
                        variant="one"
                      />
                    </div>
                  </div>

                  <div className="item-margin-3">
                    <div className="component-11-wrapper">
                      <Component11
                        className="component-14"
                        text="Reviews"
                        variant="one"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-41">
              <div className="list-4">
                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={<Component1_91 className="icon-instance-node" />}
                      variant="one"
                    />
                  </div>
                </div>

                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={
                        <Component1_92
                          className="icon-instance-node"
                          color="black"
                        />
                      }
                      variant="two"
                    />
                  </div>
                </div>

                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={
                        <Component1_5
                          className="icon-instance-node"
                          color="black"
                        />
                      }
                      variant="three"
                    />
                  </div>
                </div>

                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={
                        <Component1_6
                          className="icon-instance-node"
                          color="black"
                        />
                      }
                      variant="four"
                    />
                  </div>
                </div>

                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={
                        <Variant25
                          className="icon-instance-node"
                          color="black"
                        />
                      }
                      variant="five"
                    />
                  </div>
                </div>

                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={
                        <Component1_96
                          className="icon-instance-node"
                          color="black"
                        />
                      }
                      variant="six"
                    />
                  </div>
                </div>

                <div className="item-2">
                  <div className="component-wrapper-2">
                    <Component12
                      className="component-14"
                      hover={false}
                      icon={
                        <Component1_13
                          className="icon-instance-node"
                          color="black"
                        />
                      }
                      variant="seven"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Search Modal */}
      {showSearchModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 50,
          paddingTop: '80px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '672px',
            width: '100%',
            margin: '0 16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Search Properties</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '24px'
                }}
              >
                ×
              </button>
            </div>
            <form 
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchQuery = formData.get('search');
                if (searchQuery) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                }
                setShowSearchModal(false);
              }}
            >
              <input
                name="search"
                type="text"
                placeholder="Search by suburb, postcode, or address..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                autoFocus
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <select style={{
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}>
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Price"
                  style={{
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  style={{
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Search Properties
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};