# Editing website content

Open `/studio` and sign in with a Sanity account that belongs to this project.

## Homepage

Select **Homepage** at the top of the Content menu. Tabs cover:

- **Intro & slideshow**: badge, heading, introduction, button labels/destinations, slideshow images and seconds between slides.
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

Click **Publish** to make content available to the public website. Service pictures and the Services overview read current published content on each page request; refresh after publishing. Other content revalidates on a 60-second interval. Draft changes stay in Studio until published. No rebuild is needed for routine content edits.

Homepage and Services page are single entries; use the menu entries rather than creating duplicate documents. Existing website content remains as a fallback until replacements are published.

## A changed picture is not appearing

Saved drafts do not appear on the public website. Open the service, check its Main image, and click **Publish**, then refresh the page. A service's Main image controls that service's card and detail page; the Services overview picture is managed in **Services page**.

The website reads published content directly from Sanity without an additional API CDN cache. Services without an uploaded picture use the same fallback picture on both the card and detail page.

## Page photos and inquiry forms

Inner pages use a compact split header with the title and a framed photo, followed immediately by content. Careers and Tenders use listing layouts without main pictures. Gallery entries that repeat the main asset are omitted from the detail view.

Contact and Get Involved forms prepare an encoded subject and message, then show a send-method chooser: Gmail in a browser, Outlook.com, work/school Outlook, or the device's configured mail app. Visitors review and send from their own account; the website does not send email or ask visitors to repeat their sender address. A mailto link cannot open an app when no mail handler is configured. Browser choices and a copyable message provide alternatives.
