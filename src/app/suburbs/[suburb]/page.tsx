'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbData } from '@/data/suburbData';

export default function SuburbPage() {
  const params = useParams();
  const suburb = params?.suburb as string;
  const data = suburbData[suburb] || suburbData['berwick'];
  
  const { properties, loading } = useProperties({ 
    suburb: data.name,
    limit: 3 
  });

  return (
    <>
      {/* Article Header - ON.COM style */}
      <article style={{
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: '70vh',
          minHeight: '600px',
          overflow: 'hidden'
        }}>
          <img 
            src={data.heroImage}
            alt={data.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }} />
          
          {/* Back to top navigation */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              opacity: 0.9,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back to home
            </Link>
          </div>

          {/* Title overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '80px 0',
            textAlign: 'center'
          }}>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              paddingLeft: 'max(2rem, 3.33vw)',
              paddingRight: 'max(2rem, 3.33vw)'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '24px',
                marginBottom: '24px'
              }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#000'
                }}>Suburb Guide</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '700',
                color: '#fff',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
                marginBottom: '24px'
              }}>
                {data.title}
              </h1>
              <p style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                {data.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{
          backgroundColor: '#f8f8f8',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: '40px',
            paddingBottom: '40px',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#000',
                marginBottom: '4px'
              }}>{data.stats.medianPrice}</div>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>Median house price</div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#22c55e',
                marginBottom: '4px'
              }}>{data.stats.growth}</div>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>Annual growth</div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#000',
                marginBottom: '4px'
              }}>{data.stats.rentYield}</div>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>Rental yield</div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#000',
                marginBottom: '4px'
              }}>{data.stats.population}</div>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>Population</div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section style={{
          maxWidth: '740px',
          margin: '0 auto',
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          {data.content.map((block: any, index: number) => {
            switch (block.type) {
              case 'text':
                return (
                  <p key={index} style={{
                    fontSize: '18px',
                    lineHeight: '1.7',
                    color: '#333',
                    marginBottom: '32px'
                  }}>
                    {block.content}
                  </p>
                );
              case 'heading':
                return (
                  <h2 key={index} style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: '700',
                    color: '#000',
                    marginTop: '64px',
                    marginBottom: '24px',
                    letterSpacing: '-0.02em'
                  }}>
                    {block.content}
                  </h2>
                );
              case 'image':
                return (
                  <figure key={index} style={{
                    margin: '48px -20px',
                    maxWidth: 'calc(100% + 40px)'
                  }}>
                    <img 
                      src={block.src}
                      alt={block.caption || ''}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                    {block.caption && (
                      <figcaption style={{
                        fontSize: '14px',
                        color: '#666',
                        textAlign: 'center',
                        marginTop: '16px',
                        paddingLeft: 'max(2rem, 3.33vw)',
              paddingRight: 'max(2rem, 3.33vw)'
                      }}>
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              case 'quote':
                return (
                  <blockquote key={index} style={{
                    borderLeft: '4px solid #000',
                    paddingLeft: '32px',
                    margin: '48px 0',
                    fontStyle: 'italic'
                  }}>
                    <p style={{
                      fontSize: '24px',
                      lineHeight: '1.5',
                      color: '#000',
                      marginBottom: '16px',
                      fontWeight: '500'
                    }}>
                      "{block.content}"
                    </p>
                    {block.author && (
                      <cite style={{
                        fontSize: '16px',
                        color: '#666',
                        fontStyle: 'normal'
                      }}>
                        — {block.author}
                      </cite>
                    )}
                  </blockquote>
                );
              default:
                return null;
            }
          })}

          {/* Highlights Section */}
          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '32px',
            borderRadius: '8px',
            marginTop: '64px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#000'
            }}>
              Why choose {data.name}?
            </h3>
            <ul style={{
              margin: 0,
              paddingLeft: '24px'
            }}>
              {data.highlights.map((highlight: string, index: number) => (
                <li key={index} style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Properties Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: '80px 0',
          borderTop: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 3vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '16px',
              textAlign: 'center',
              color: '#000'
            }}>
              Current listings in {data.name}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '48px'
            }}>
              Explore available properties in this sought-after suburb
            </p>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #e0e0e0',
                  borderTop: '3px solid #000',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : properties.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '48px'
              }}>
                {properties.map((property) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e5e5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }}>
                    <Link href={`/property/${property.id}`} style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        backgroundColor: '#f5f5f5'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
                          }}>
                            No image
                          </div>
                        )}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px'
                        }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>
                      
                      <div style={{ padding: '24px' }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          marginBottom: '8px'
                        }}>
                          {property.priceDisplay || formatPrice(property.price)}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '12px',
                          lineHeight: '1.4'
                        }}>
                          {property.address}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '16px',
                          fontSize: '14px',
                          color: '#666'
                        }}>
                          <span>{property.bedrooms} beds</span>
                          <span>{property.bathrooms} baths</span>
                          <span>{property.carSpaces} cars</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                paddingTop: '60px',
                paddingBottom: '60px',
                paddingLeft: 'max(2rem, 3.33vw)',
                paddingRight: 'max(2rem, 3.33vw)',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                marginBottom: '48px'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  No properties currently available in {data.name}
                </p>
                <Link href="/buy" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '32px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  Browse all properties
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            )}

            {/* View more CTA */}
            <div style={{ textAlign: 'center' }}>
              <Link href={`/buy?suburb=${data.name}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#000',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                borderBottom: '2px solid #000',
                paddingBottom: '4px',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                View all {data.name} properties
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '80px 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Ready to explore {data.name}?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              Connect with our local experts who know every street and every opportunity in {data.name}.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '32px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Get in touch
              </Link>
              <Link href="/appraisal" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '32px',
                border: '2px solid #fff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                Property appraisal
              </Link>
            </div>
          </div>
        </section>
      </article>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}