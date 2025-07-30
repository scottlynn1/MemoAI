import type { Conversation } from '@/types/conversation';
import * as cheerio from 'cheerio';


/**
 * Extracts a Meta share page into a structured Conversation.
 */
export async function parseMeta(html: string): Promise<Conversation> {
  const $ = cheerio.load(html);
  const styles = $('head style').toString();
  const links = $('head link').toString();
  const head = `<head>${styles}${links}</head>`;
  let input = $('div[role="textbox"]');
  let sibling = null;
  while (!sibling) {
    input = input.parent('div')
    sibling = input.prev();
  }
  const convo = sibling.toString();
  console.log('convo', convo.length, convo);
  // const divs = $('div.x78zum5.xdt5ytf.x1na6gtj.xz9dl7a.xsag5q8.xh8yej3').toString();
  const conversation = '<html class="_9dls _asb0 __fb-light-mode" lang="en" dir="ltr">' + head + convo + '</html>';
  return {
    model: 'Meta',
    content: conversation,
    scrapedAt: new Date().toISOString(),
    sourceHtmlBytes: html.length,
  };
}
