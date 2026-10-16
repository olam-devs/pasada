# Editing website content

Open `/studio` and sign in with a Sanity account that belongs to this project.

## Homepage

Select **Homepage & slideshow** at the top of the Content menu. `/studiogo` opens this entry directly. Tabs cover:

- **Slideshow** (first tab): images in display order and seconds between slides. Drag the handles, then Publish.
- **Introduction**: badge, heading, introduction and button labels/destinations.
- **Organisation & values**: introduction-section heading/link and mission, values and vision headings.
- **Highlights & mission**: highlight cards and the homepage mission box.
- **Services / Projects / Stories sections**: homepage headings and links.
- **Support banner**: heading, description and buttons.
- **Testimonials section**: heading, description, carousel labels and link.

For the slideshow, add photos from the image library or upload them, enter an image description, then drag slides to reorder. Choose **Show entire image** for logos. Once you publish a nonempty image list, it replaces the original slideshow. Until then, the original slides remain visible. Removing the image list restores the original slideshow.

The actual featured services, projects, stories and testimonials are still edited in their own entries. Their **Featured** and **Display order** fields control what appears on the homepage; homepage item limits are in **Site settings**.

## Services main picture

Select **Services page → Services main picture** to change the photo in the compact header on `/services`. Upload/select a picture and set its crop/hotspot if needed. The same entry includes the heading, introduction and filter label.

For a specific service's card/detail picture, select **Services → the service → Main image**. This updates that service's image on the homepage, Services list and service detail page.

## Publishing

Click **Publish** to make content available to the public website. Homepage settings, service pictures and the Services overview read current published content on each page request; refresh after publishing. Other content revalidates on a 60-second interval. Draft changes stay in Studio until published. No rebuild is needed for routine content edits.

Homepage and Services page are single entries; use the menu entries rather than creating duplicate documents. Existing website content remains as a fallback until replacements are published.

## A changed picture is not appearing

Saved drafts do not appear on the public website. Open the service, check its Main image, and click **Publish**, then refresh the page. A service's Main image controls that service's card and detail page; the Services overview picture is managed in **Services page**.

The website reads published content directly from Sanity without an additional API CDN cache. Services without an uploaded picture use the same fallback picture on both the card and detail page.

## Page photos and inquiry forms

Inner pages use a compact maroon banner with the title, breadcrumb and framed artwork. Contact, Get Involved, Testimonials and Blog use themed vector illustrations in `public/illustrations`, coloured to match the PASADA logo. Careers and Tenders use listing layouts without main pictures. Gallery entries that repeat the main asset are omitted from the detail view.

Testimonial categories use symbols instead of photographs. Set **Testimonial categories → Category symbol** to select people, a heart, helping hand, handshake or conversation. Unset symbols follow the category slug; unknown categories use a conversation symbol. Older category images are retained in content but are no longer displayed.

Contact and Get Involved forms prepare an encoded subject and message, then show a send-method chooser: Gmail in a browser, Outlook.com, work/school Outlook, or the device's configured mail app. Visitors review and send from their own account; the website does not send email or ask visitors to repeat their sender address. A mailto link cannot open an app when no mail handler is configured. Browser choices and a copyable message provide alternatives.

## Brand and homepage layout

The layout follows the MDH reference's contact strip, desktop navigation, full-width slideshow, organisation introduction, service/project cards, mission and values, news, support banner and detailed footer. All content belongs to PASADA; no MDH copy, statistics, photos or partner logos are used.

Colours in `src/app/globals.css` follow the PASADA logo: red `#bd2939`, deep maroon `#48131b`, gold `#ddb52e`, black and white, with cream and blush backgrounds. The header displays the original logo without distortion in a square 82px desktop / 72px phone area.

The homepage introduction and vision/core values come from **About page**. Slideshow settings, headings, calls to action, highlights, mission summary and section labels remain in **Homepage & slideshow**. Featured service, project, story and testimonial entries still use their own content settings. Photo slides use their original proportions as the source for the responsive hero rather than an extra 4:3 crop; logos use **Show entire image**. The slideshow offers pause, next/previous and individual slide buttons, and honours reduced-motion preferences.
