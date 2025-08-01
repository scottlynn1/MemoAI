import type { Conversation } from '@/types/conversation';
import * as cheerio from 'cheerio';


/**
 * Extracts a Meta share page into a structured Conversation.
 */
export async function parseMeta(html: string): Promise<Conversation> {
  const $ = cheerio.load(html);
  const styles = $('head style').toString();
  const links = $('head link').toString();
  const head = `<head>${styles}${links}<style>[role="button"] {display:none !important}</style></head>`;
  let input = $('div[role="textbox"]');
  let sibling = {length: 0};
  while (!sibling.length) {
    input = input.parent('div')
    sibling = input.prev();
  }
  const convo = sibling.toString();
  const conversation = '<html class="_9dls _asb0 __fb-light-mode" lang="en" dir="ltr">' + head + convo + '</html>';
  return {
    model: 'Meta',
    content: conversation,
    scrapedAt: new Date().toISOString(),
    sourceHtmlBytes: html.length,
  };
}
