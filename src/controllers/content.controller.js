const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const generator = require('../services/contents');
// const { subscriberService } = require('../services');
// const { subscription } = require('../config/plan');

const generate = catchAsync(async (req, res) => {
  const { _id, email } = req.user;
  // const { credits, freeTrial, subscription: currentPackage, isPaidSubscribers } = await subscriberService.getOwnSubscribe(
  //   email
  // );

  const tempfalse = false;

  // if (tempfalse && credits === 0) {
  if (tempfalse) {
    //   res.status(httpStatus.PAYMENT_REQUIRED).send({ message: 'Upgrade our friendship today!' });
    // } else if (currentPackage === subscription.FREEMIUM && freeTrial.eligible === false) {
    //   res.status(httpStatus.BAD_REQUEST).send({ message: 'Free trial expired, Upgrade our friendship today!' });
    // } else if (freeTrial.eligible === true && freeTrial.dailyLimitExceeded === true) {
    //   res.status(httpStatus.BAD_REQUEST).send({ message: 'Free trial daily limit exceeded' });
    // } else if (freeTrial.eligible === false && isPaidSubscribers === false) {
    //   res.status(httpStatus.BAD_REQUEST).send({ message: 'Subscription expired,' });
    res.status('unlimited usage');
  } else {
    const { task } = req.body;

    let generatedContent;

    if (task === 'paraphrasing') {
      generatedContent = await generator.writing.paraphrase(_id, email, req.body);
    } else if (task === 'expander') {
      generatedContent = await generator.writing.expander(_id, email, req.body);
    } else if (task === 'simplifier') {
      generatedContent = await generator.writing.simplify(_id, email, req.body);
    } else if (task === 'summarizer') {
      generatedContent = await generator.writing.summarize(_id, email, req.body);
    } else if (task === 'notes-from-passage') {
      generatedContent = await generator.writing.notesFromPassage(_id, email, req.body);
    } else if (task === 'grammar-fixer') {
      generatedContent = await generator.writing.grammarFixer(_id, email, req.body);
    } else if (task === 'change-tone') {
      generatedContent = await generator.writing.changeTone(_id, email, req.body);
    } else if (task === 'blog-idea') {
      generatedContent = await generator.blog.blogIdea(_id, email, req.body);
    } else if (task === 'blog-headline') {
      generatedContent = await generator.blog.blogHeadline(_id, email, req.body);
    } else if (task === 'blog-outline') {
      generatedContent = await generator.blog.blogOutline(_id, email, req.body);
    } else if (task === 'blog-intro') {
      generatedContent = await generator.blog.blogIntro(_id, email, req.body);
    } else if (task === 'blog-topic') {
      generatedContent = await generator.blog.blogTopic(_id, email, req.body);
    } else if (task === 'product-description') {
      generatedContent = await generator.product.productDescription(_id, email, req.body);
    } else if (task === 'seo-friendly-product-description') {
      generatedContent = await generator.product.makeProductDescriptionSEOFriendly(_id, email, req.body);
    } else if (task === 'product-review') {
      generatedContent = await generator.product.productReview(_id, email, req.body);
    } else if (task === 'catchy-headline') {
      generatedContent = await generator.headline.catchyHeadline(_id, email, req.body);
    } else if (task === 'attention-grabbing-headline') {
      generatedContent = await generator.headline.attentionGrabbingHeadline(_id, email, req.body);
    } else if (task === 'newspaper-headline') {
      generatedContent = await generator.headline.newspaperHeadline(_id, email, req.body);
    } else if (task === 'resume-headline') {
      generatedContent = await generator.headline.resumeHeadline(_id, email, req.body);
    } else if (task === 'campaign-facebook-post') {
      generatedContent = await generator.facebook.campaignPostFromBusinessType(_id, email, task, req.body);
    } else if (task === 'ads-facebook-primary-texts') {
      generatedContent = await generator.facebook.facebookAdPrimaryTexts(_id, email, req.body);
    } else if (task === 'ads-facebook-headlines') {
      generatedContent = await generator.facebook.facebookAdHeadlines(_id, email, req.body);
    } else if (task === 'ads-facebook-link-descriptions') {
      generatedContent = await generator.facebook.facebookAdLinkDescription(_id, email, req.body);
    } else if (task === 'facebook-ads-from-product-description') {
      generatedContent = await generator.facebook.facebookAdsFromProductDescription(_id, email, req.body);
    } else if (task === 'instagram-ad-texts') {
      generatedContent = await generator.instagram.instagramAdTexts(_id, email, req.body);
    } else if (task === 'linkedin-ad-texts') {
      generatedContent = await generator.linkedIn.linkedinAdTexts(_id, email, req.body);
    } else if (task === 'ads-google-headlines') {
      generatedContent = await generator.google.googleAdHeadlines(_id, email, req.body);
    } else if (task === 'ads-google-descriptions') {
      generatedContent = await generator.google.googleAdDescriptions(_id, email, req.body);
    } else if (task === 'youtube-video-titles-from-description') {
      generatedContent = await generator.youtube.youtubeVideoTitleFromDescription(_id, email, req.body);
    } else if (task === 'youtube-video-ideas') {
      generatedContent = await generator.youtube.youtubeVideoIdeas(_id, email, req.body);
    } else if (task === 'image-idea-from-ad-text') {
      generatedContent = await generator.commonTask.imageIdeasFromAdText(_id, email, req.body);
    } else if (task === 'email-marketing-campaign-subject') {
      generatedContent = await generator.email.emailMarketingCampaignSubject(_id, email, req.body);
    } else if (task === 'email-marketing-campaign-body') {
      generatedContent = await generator.email.emailMarketingCampaignBody(_id, email, req.body);
    } else if (task === 'email-body') {
      generatedContent = await generator.email.emailBody(_id, email, req.body);
    } else if (task === 'website-short-description') {
      generatedContent = await generator.website.websiteShortDescription(_id, email, req.body);
    } else if (task === 'website-keywords-from-text') {
      generatedContent = await generator.website.keywordsFromText(_id, email, req.body);
    } else if (task === 'youtube-video-tags-from-description') {
      generatedContent = await generator.youtube.generateVideoTagsFromDescription(_id, email, req.body);
    } else if (task === 'youtube-channel-tags-from-description') {
      generatedContent = await generator.youtube.generateChannelTagsFromDescription(_id, email, req.body);
    } else if (task === 'website-seo-friendly-blog-ideas') {
      generatedContent = await generator.website.SEOFriendlyBlogIdeas(_id, email, req.body);
    } else if (task === 'website-landing-page-headline') {
      generatedContent = await generator.website.landingPageHeadline(_id, email, req.body);
    } else if (task === 'product-name') {
      generatedContent = await generator.product.generateProductName(_id, email, req.body);
    } else if (task === 'linkedin-summary') {
      generatedContent = await generator.linkedIn.generateLinkedInSummary(_id, email, req.body);
    } else if (task === 'catchy-business-taglines') {
      generatedContent = await generator.business.generateCatchyBusinessTaglines(_id, email, req.body);
    } else if (task === 'fiverr-categories-headline') {
      generatedContent = await generator.fiverr.generateFiverrCategoriesHeadline(_id, email, req.body);
    } else if (task === 'cv-summary') {
      generatedContent = await generator.cv.generateCVSummary(_id, email, req.body);
    } else if (task === 'amazon-product-listings') {
      generatedContent = await generator.amazon.generateAmazonProductListings(_id, email, req.body);
    } else if (task === 'problem-agitate-solution') {
      generatedContent = await generator.sales.problemAgitateSolution(_id, email, req.body);
    } else if (task === 'problem-agitate-solution-outcome') {
      generatedContent = await generator.sales.problemAgitateSolutionOutcome(_id, email, req.body);
    } else if (task === 'attention-interest-desire-action') {
      generatedContent = await generator.sales.attentionInterestDesireAction(_id, email, req.body);
    } else if (task === 'generate-recipe') {
      generatedContent = await generator.recipe.generateRecipe(_id, email, req.body);
    }

    res.status(httpStatus.OK).send(generatedContent);
  }
});

module.exports = {
  generate,
};
