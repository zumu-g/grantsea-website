import React, { useState } from "react";
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
import { Variant1 } from "../../icons/Variant1";
import { Variant11 } from "../../icons/Variant11";
import { Variant25 } from "../../icons/Variant25";
import AIChatWidget from "../../../AIChatWidget";
import "./style.css";

export const ElementLight = () => {
  // Carousel state for New Arrivals
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  
  const properties = [
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

  const nextProperty = () => {
    setCurrentPropertyIndex((prev) => (prev + 1) % properties.length);
  };

  const prevProperty = () => {
    setCurrentPropertyIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const getVisibleProperties = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentPropertyIndex + i) % properties.length;
      visible.push(properties[index]);
    }
    return visible;
  };

  return (
    <div className="element-light">
      <div className="overlap-group">
        <div className="container-4">
          <Variant1 className="variant-1" />
          <header className="header">
            <div className="container-5">
              <div className="container-6">
                <div className="container-7">
                  <div className="nav-navigation">
                    <Component hover={false} variant="one" />
                    <Component
                      hover={false}
                      icon={<Component1_59 className="icon-instance-node" />}
                      variant="two"
                    />
                    <Component
                      hover={false}
                      icon={<Component1_60 className="icon-instance-node" />}
                      variant="three"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-primary">
              <div className="item-margin">
                <div className="item-button-menu">Buy</div>
              </div>

              <div className="item-margin">
                <div className="item-button-menu">Sell</div>
              </div>

              <div className="item-margin">
                <div className="item-button-menu">Lease</div>
              </div>
            </div>
          </header>
        </div>

        <div className="section-main">
          <div className="section-article">
            <div className="container-8">
              <div className="div-wrapper-2">
                {/* Video placeholder with styling to match the design */}
                <div className="picture-fw" style={{
                  background: 'linear-gradient(to bottom, #333, #111)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: '300'
                }}>
                  [Video Placeholder - Property Showcase]
                </div>
              </div>
            </div>

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

          {/* Estate Agent Section with Service Buttons */}
          <div className="section-section" style={{ position: 'relative', paddingBottom: '40px' }}>
            <div style={{
              position: 'absolute',
              right: '40px',
              top: '-100px',
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              width: '320px'
            }}>
              <div style={{
                width: '100%',
                height: '200px',
                background: '#f0f0f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: '#999'
              }}>
                [Estate Agent Image]
              </div>
              
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '16px',
                textAlign: 'center' 
              }}>
                How can we help?
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>I'm looking to buy</button>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#1f2937',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>I'm looking to lease</button>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>I'm looking to sell</button>
              </div>
            </div>

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
                    className="component-18"
                    component156StyleOverrideClassName="component-2"
                    hover={false}
                    text="Ask Grant's AI"
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

            <img className="img" alt="Container" src="/static/img/container.svg" />
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
              <div className="container-16">
                {getVisibleProperties().map((property, index) => (
                  <div className="group-wrapper" key={`${property.id}-${index}`}>
                    <div className="article-wrapper">
                      <a href={`/property/${property.id}`} className="article" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <div className="container-17">
                          <Component
                            className="component-14"
                            hover={false}
                            icon={<Variant11 className="icon-instance-node" />}
                            variant="four"
                          />
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
                          <div className="text-wrapper-4">{property.tag}</div>

                          <div className="container-20">
                            <p className="text-wrapper-5">
                              {property.address}
                            </p>
                          </div>

                          <div className="container-21">
                            <p className="text-wrapper-6">
                              {property.description}
                            </p>
                          </div>

                          <div className="container-22">
                            <div className="text-wrapper-7">{property.details}</div>
                          </div>

                          <div className="container-23">
                            <div className="text-wrapper-7">{property.price}</div>
                          </div>
                        </div>
                      </a>
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
      <AIChatWidget />
    </div>
  );
};