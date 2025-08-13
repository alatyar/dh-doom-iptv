import { Metadata } from 'next';
import { siteConfig } from '@/content/site.config';

interface OpenGraphProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'video';
  locale?: string;
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateOpenGraphMetadata({
  title,
  description,
  url = siteConfig.url,
  image = `${siteConfig.url}/images/og-image.jpg`,
  type = 'website',
  locale = 'en_US',
  siteName = 'DOOM VIP IPTV',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags
}: OpenGraphProps): Metadata['openGraph'] {
  const openGraph: Metadata['openGraph'] = {
    title,
    description,
    url,
    siteName,
    locale,
    type,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/jpeg'
      },
      {
        url: `${siteConfig.url}/images/doom_smarter_vip-logo.avif`,
        width: 512,
        height: 512,
        alt: 'DOOM VIP IPTV Logo',
        type: 'image/avif'
      }
    ]
  };

  // Add article-specific properties
  if (type === 'article' && publishedTime) {
    openGraph.publishedTime = publishedTime;
    if (modifiedTime) openGraph.modifiedTime = modifiedTime;
    if (author) openGraph.authors = [author];
    if (section) openGraph.section = section;
    if (tags) openGraph.tags = tags;
  }

  return openGraph;
}

export function generateTwitterMetadata({
  title,
  description,
  image = `${siteConfig.url}/images/twitter-card.jpg`,
  creator = '@doomvipiptv'
}: {
  title: string;
  description: string;
  image?: string;
  creator?: string;
}): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator,
    site: '@doomvipiptv',
    images: [
      {
        url: image,
        alt: title,
        width: 1200,
        height: 630
      }
    ]
  };
}

// Generate comprehensive social media metadata
export function generateSocialMetadata({
  title,
  description,
  url,
  image,
  type = 'website',
  locale = 'en_US',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags
}: OpenGraphProps): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: generateOpenGraphMetadata({
      title,
      description,
      url,
      image,
      type,
      locale,
      publishedTime,
      modifiedTime,
      author,
      section,
      tags
    }),
    twitter: generateTwitterMetadata({
      title,
      description,
      image
    })
  };
}
