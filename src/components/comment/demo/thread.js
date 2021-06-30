/**
 * Retrieved from an article with a lot of discussion
 *
 * @see https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comments
 * @see https://gist.github.com/tylersticka/34a606eb60ebb006ea6d4281cd886a55
 */

export const comments = [
  {
    ID: '5843',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5843',
    date: '2019-09-19',
    author: {
      name: 'Amier',
    },
    comment_content:
      '<p>Wow, what a cool finding. I was under the impression that maxlength did nothing on number inputs. In my quick test the behavior of maxlength is inconsistent when manually entering content. On Windows, in Chrome and Firefox maxlength isn’t enforced for number inputs. Edge (non-chromium) does enforce maxlength on number inputs when numbers are entered but allows letters to be entered and doesn’t enforce maxlength in that case. Chrome, Firefox and Edge enforce maxlength for text inputs. On Android, in both Chrome and Firefox, maxlength wasn’t enforced for both number and text inputs. <a href="https://jsfiddle.net/x4qgrafv/1/" rel="nofollow ugc"></a><a href="https://jsfiddle.net/x4qgrafv/1/" rel="nofollow">https://jsfiddle.net/x4qgrafv/1/</a></p>',
    children: [
      {
        ID: '5845',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5845',
        date: '2019-09-19',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Thanks for the comment Amier. You raise a great question. Thanks for the jsfiddle example.</p>\n<p>I never tested the exact combination you looked at. I was mostly trying to figure out how to get autofill to work. Adding <code>maxlength</code> solved autofill so I didn’t go one step further to strip out all of the Angular code to make sure that <code>maxlength</code> not only fixed autofill, but constrained the length of the input.</p>\n<p>I also never bothered to test changing  input type from <code>text</code> to <code>number</code> because I started with <code>maxlength</code> and it fixed the problem.</p>\n<p>Looking at the  spec for <code>maxlength</code>, I didn’t see anything that indicates that is shouldn’t work on number fields. But you’re right that I missed the section in the <a href="https://html.spec.whatwg.org/dev/input.html#number-state-(type=number)" rel="nofollow"><code>number</code> spec</a>that specifically says that <code>maxlength</code> should not be used with <code>number</code>.</p>\n<p>If we use <code>number</code>, we’re supposed to instead use <code>min</code> and <code>max</code> to define the minimum and maximum values. In 2019, that would probably work for a credit card date field that accepts two digits, but it wouldn’t work around the turn of the century where the expiration year might be <code>01</code> which the <code>number</code> field would treat as <code>1</code> because <code>01</code> isn’t a number.</p>\n<p>Thinking aloud here, I wonder if the suggestion to use <code>number</code> for this field is the real problem. This might be a case where using <code>text</code> with a <code>pattern</code> would be the better solution because we want two digits which may, or may not, be a real numerical value.</p>\n<p>🤔</p>\n<p>BTW, comments on most sites are a cesspool, but we’ve kept our comments open because we tend to get smart comments that contribute to the conversation. Thanks Amier for providing yet another example of how wonderful our readers are.</p>',
        is_child: true,
      },
      {
        ID: '5854',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5854',
        date: '2019-09-20',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Hi Amier. After doing some testing, I’ve <a href="https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#web-standards-alternatives">updated the article</a> to suggest using <code>text</code> with <code>pattern</code> instead of using <code>number</code>. I’ve added a <a href="https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#fn-5555-1">footnote</a> to document the change and why it was made. Thanks again for flagging this for me.</p>',
        is_child: true,
      },
    ],
  },
  {
    ID: '5847',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5847',
    date: '2019-09-20',
    author: {
      name: 'Jash Sayani',
    },
    comment_content: '<p>Great find. I hope the guys at Chipotle fix this.</p>',
  },
  {
    ID: '5852',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5852',
    date: '2019-09-20',
    author: {
      name: 'Cavin',
    },
    comment_content:
      '<p>A bigger problem is that this type of autofill allows anyone who has someone’s credit card for 10 seconds to use it at Chipotle or anywhere else they know the formula. I’m not implying that YOU use your mom’s credit card for your OWN lunch until she happens to notice, but that you COULD. Hardly secure.</p>',
    children: [
      {
        ID: '5855',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5855',
        date: '2019-09-20',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content: '<p>I’m not sure I follow.</p>',
        is_child: true,
      },
      {
        ID: '5903',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5903',
        date: '2019-09-25',
        author: {
          name: 'Michael',
        },
        comment_content:
          '<p>All technology can be abused and used for bad purposes. In your example autofill is not the issue but rather the fact, that all information that’s needed to buy is written on the card, is. A fraudster could just as easily take a picture of the card’s front and back.</p>\n<p>Be vigilant to transactions you don’t recognize and consider (if possible) to set up additional security to your credit card (eg Visa 3D Secure).</p>',
        is_child: true,
      },
      {
        ID: '5907',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5907',
        date: '2019-09-26',
        author: {
          name: 'Chris',
        },
        comment_content:
          '<p>I think what Cavin is saying is that autofill is bad?</p>',
        is_child: true,
      },
      {
        ID: '5917',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5917',
        date: '2019-09-27',
        author: {
          name: 'Jason Featheringham',
        },
        comment_content:
          '<p>Browsers always ask you if you’d like to save your CC info for autocompletion when submitting.  So your Mom would have to opt in for making this insecure if you use the same device.</p>',
        is_child: true,
      },
      {
        ID: '5918',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5918',
        date: '2019-09-27',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Perhaps it wasn’t clear, but I was using my own laptop to make the purchase. Maybe that’s where the confusion comes from.</p>',
        is_child: true,
      },
    ],
  },
  {
    ID: '5862',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5862',
    date: '2019-09-20',
    author: {
      name: 'Michael',
    },
    comment_content:
      '<p>I think select elements are a lot less error prone for expiration dates. Not sure how that would affect autofill or Chipotle’s revenues.</p>',
    children: [
      {
        ID: '5927',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5927',
        date: '2019-09-30',
        author: {
          name: 'zeen3',
        },
        comment_content:
          '<p>Short: it takes longer<br>\nLong: on first checkout, it takes far longer for the majority of users to fill in on a select based form than an input based one. The ideal is always that it always works with autofill so users are 99% more lazy, but it’s still there.</p>\n<p>When the payments API is supported (and the default with a fallback available) it offers eeverything in a well done fashion. Base it off that I guess…</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5865',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5865',
    date: '2019-09-20',
    author: {
      name: 'David Moore',
    },
    comment_content:
      '<p>Hello Jason,</p>\n<p>Nice troubleshooting! As a former AngularJS developer, your solution can pose problems with the form validation that AngularJS does since it doesn’t hook into the html5 validators directly.</p>\n<p>Your solution can still be implemented AND play nice with AngularJS by using the directives for validators (ng-maxlength and ng-pattern).</p>\n<p>Nice article!</p>',
    children: [
      {
        ID: '5890',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5890',
        date: '2019-09-24',
        author: {
          name: 'Colin Richardson',
        },
        comment_content:
          '<p>That sounds like it might be something AngularJS should look into if it’s not able to use html standards.</p>',
        is_child: true,
      },
    ],
  },
  {
    ID: '5870',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5870',
    date: '2019-09-20',
    author: {
      name: 'Improviser',
    },
    comment_content:
      '<p>Great article but ironically, when I tried to subscribe to weekly posts, the form’s button doesn’t fire. Not trying to be a smart, just thought you should know. Anyway, love the article and the real use case example is great.</p>',
    children: [
      {
        ID: '5872',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5872',
        date: '2019-09-20',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Whoa. That’s not good. Thanks for letting us know. What browser were you using?</p>',
        is_child: true,
      },
    ],
  },
  {
    ID: '5873',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5873',
    date: '2019-09-21',
    author: {
      name: 'Michael Butler',
    },
    comment_content:
      '<p>I wonder if, for even more reliability, it’s better to just use the full 4 digits. It’s more explicit but then again, more to type for non autofillers. And then there’s the infamous drop down select menu…</p>',
    children: [
      {
        ID: '5891',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5891',
        date: '2019-09-24',
        author: {
          name: 'Colin Richardson',
        },
        comment_content:
          '<p>I am not sure about everyone, but it is prob less to type, because I myself would try to put in the full year, and then watch how my full year vanished, and left the wrong part of the year, so then I go back and type the end part.. so that ends up being 6 chars typed not 4. Not even counting the deleting of the invalid value.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5880',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5880',
    date: '2019-09-23',
    author: {
      name: 'David',
    },
    comment_content:
      '<p>Awesome article, especially because it explains in detail and with numbers the impact on the business that a decision can have.</p>\n<p>Following the same idea of the article, I wanted to share this article on twitter and I didn’t find a button to do it automatically, so I gave up and I’m going to keep working, how much money will this cost you?</p>\n<p>Regards,<br>\nDavid</p>',
    children: [
      {
        ID: '5898',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5898',
        date: '2019-09-24',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Hi David,</p>\n<p>Thanks for the comment. Regarding your questions about social sharing buttons, that was a conscious decision not to include them on our part. We don’t use them for three reasons:</p>\n<ol>\n<li>Studies say they don’t get used often. Moovweb found that <a href="https://www.moovweb.com/anyone-use-social-sharing-buttons-mobile/" rel="nofollow">“Only 0.2% of users ever click on a mobile sharing button”</a>. Smashing Magazine found that removing the buttons <a href="https://twitter.com/smashingmag/status/204955763368660992" rel="nofollow">increased inbound traffic</a>.</li>\n<li>These social icons often allow the Facebook, Twitter and others to track what content you’re visiting. This has <a href="https://www.theregister.co.uk/2018/12/20/eu_facebook_like_button_gdpr/" rel="nofollow">obvious privacy implications</a>.</li>\n<li>Social media buttons—particularly those added by third-party scripts—add page bloat and <a href="http://www.ericmobley.net/social-media-share-buttons-impact-on-performance/" rel="nofollow">affect performance</a>.</li>\n</ol>\n<p>So we have good reasons for not including them. That said, I am interested in adding support for the <a href="https://developers.google.com/web/updates/2016/09/navigator-share" rel="nofollow">Web Share API</a> which can be used to trigger the native sharing mechanism in browsers that support it. We can test for browser support and add it without too much additional JavaScript.</p>\n<p>As for the amount of money not including social buttons costs us? It is unlikely to cost us anything. We don’t make money off of the articles we write. We don’t have advertising. We don’t have subscriptions.</p>\n<p>We write articles to share what we’ve learned and to help move the web forward. Any monetary relationship between what we write and the work we do is indirect at best.</p>\n<p>Thanks for your note and the reminder that we should add Web Share API support to our backlog.</p>\n<p>-Jason</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5906',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5906',
    date: '2019-09-26',
    author: {
      name: 'Page Clinic',
    },
    comment_content:
      '<p>This exact same thing happens to me on Grubhub.  Great job detailing this out!</p>',
  },
  {
    ID: '5919',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5919',
    date: '2019-09-27',
    author: {
      name: 'Bet Hannon',
    },
    comment_content:
      '<p>I’ve had this happen on several sites, and always blamed LastPass and made a mental note to check on it later. Thanks for your discovery &amp; explaining this!</p>',
  },
  {
    ID: '5923',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5923',
    date: '2019-09-28',
    author: {
      name: 'Madeline Bernard',
    },
    comment_content:
      '<p>I always try to use input type=’tel’ for fields where I want a number, because on mobile if you’re typing it in, that will bring up the number pad keyboard, without the UI showing the annoying stepper arrows that type=’num’ adds. Could ‘tel’ replace ‘text’ in your suggestion?</p>\n<p>Well-written article, thanks!</p>',
  },
  {
    ID: '5926',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5926',
    date: '2019-09-29',
    author: {
      name: "Sallie Goetsch (rhymes with 'sketch')",
    },
    comment_content:
      '<p>Holy heck! Chipotle should pay you at least $85,000 for discovering that bug. (Though I am a little puzzled as to why you save cards in the browser if you already have 1Password.)</p>',
    children: [
      {
        ID: '5931',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5931',
        date: '2019-09-30',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Storing them in the browsers is faster when filling out forms. Plus, 1Password is a power user experience and is part of the reason why I ignored autofill for so many years. So now I like to use autofill so I can see where it breaks.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5956',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5956',
    date: '2019-10-02',
    author: {
      name: 'cosmo',
    },
    comment_content: '<p>Cool. I learned something today!</p>',
  },
  {
    ID: '5957',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5957',
    date: '2019-10-02',
    author: {
      name: 'Andrew Douglass',
    },
    comment_content:
      '<p>I always fall into the trap of ignoring if a “number” is really a number, especially in the case of input field types. I have to think about something a friend once told me – if you aren’t doing math on it, it’s probably just a string in disguse. It’s really useful to remember for databases, too. I’ve seen too many databases where things like phone numbers are stored as BIGINT.</p>\n<p>It would be really nice if we could specify a keyboard without specifying a field type for situations like this.</p>',
    children: [
      {
        ID: '5981',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5981',
        date: '2019-10-03',
        author: {
          name: 'Amier',
        },
        comment_content:
          '<p>The <a href="https://html.spec.whatwg.org/multipage/interaction.html#input-modalities%3A-the-inputmode-attribute" rel="nofollow">inputmode attribute</a> can be use to specify a keyboard. <a href="https://caniuse.com/#feat=input-inputmode" rel="nofollow">Browser support</a> is becoming more widespread.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5978',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5978',
    date: '2019-10-03',
    author: {
      name: 'Ben',
    },
    comment_content:
      '<p>These are the little cracks that happen when you have the traditional designer / developer approach. Likely the individual who built this form was more of a our engineer type just implementing from a static mockup. Teams with front end specialists who focus on building standardized components are able to anticipate these kinds of things.</p>',
  },
  {
    ID: '5988',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5988',
    date: '2019-10-04',
    author: {
      name: 'Evan',
    },
    comment_content:
      '<p>To clarify- when autofill enters 2024 only the 20 get through. This would leave to me believe that for credit cards that expire in 2020 would not experience the issue because coincidentally the first and last two digits are the same. How many credit cards expire in 2020? I would super roughly ballpark guess 33% because credit cards typically expire 3 years after issue. You should therefore subtract 33% from your revenue loss estimates.</p>',
    children: [
      {
        ID: '5989',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5989',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Sure. That’s fine. The cost estimate is certainly wrong. I’ve had people argue it is too high. I’ve had others argue is too low. The half a percent increase in revenue was just a wild guess anyways.</p>\n<p>The article wasn’t about the potential revenue. It was to highlight autofill, the potential impact it can have, and the relatively small amount of markup it takes to support it.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5990',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5990',
    date: '2019-10-04',
    author: {
      name: 'Dmitry',
    },
    comment_content:
      '<p>You gonna be a star! Even some Russian news agencies made a post about your finding 😉<br>\nThanks for article! Very nice!<br>\nP.S. I agree with Madeline Bernard about input type=tel for mobile. It provides a better user experience.</p>',
    children: [
      {
        ID: '6009',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6009',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>As Amier suggests in a different comment, the long term solution is <code>inputmode</code> for getting the correct keyboard. I want to write more about this in the near future, but in the meantime, there is a pretty good CSS Tricks article by Ollie Williams about <a href="https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/" rel="nofollow">triggering finger friendly numerical inputs</a>.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5991',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5991',
    date: '2019-10-04',
    author: {
      name: 'Maher Santina',
    },
    comment_content:
      '<p>Nice article! Good effort in debugging and figuring out this issue and writing! However, I didn’t like the click-bait factor in it. I came to read thinking it was something but it’s actually a completely different thing.<br>\nCheers!</p>',
    children: [
      {
        ID: '6011',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6011',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Thanks for your feedback. I can understand how someone might think the title is clickbait, but I disagree.</p>\n<p>First, the headline describes the content of the article. Chipotle’s web form is missing a single html attribute that blocks autofill and that attribute has the potential to cause them to lose millions of dollars of revenue. I wrote multiple variations of the headline before settling on a simple, straightforward description of the content.</p>\n<p>Second, sure I like it when articles I like gain traction, but I never know when it will happen. Things that I’ve thought were certain to be shared widely have received no notice. Other things that I wrote that seemed like throw away articles have been incredibly popular.</p>\n<p>Because of this, I gave up long ago trying to drive traffic to things. I write about what I find interesting and that I think others might too. If it gets shared, that’s cool. If it doesn’t, that’s cool too.</p>\n<p>As a former journalism major, I’d like to believe my professors would be pleased with the headline. It seems to fit all of the standards we discussed for writing newspaper headlines. That was long before going viral and clickbait were even things. The web was just starting.</p>\n<p>But hell, maybe I’m wrong and it turns out that my idea of a simple, direct headline lands for readers as a clickbait headline. It’s always hard to know for certain how something you write will be perceived.</p>\n<p>As Washington once said, “I am unconscious of intentional error, I am nevertheless too sensible of my defects not to think it probable that I may have committed many errors.” That’s the story of my life.</p>',
        children: [
          {
            ID: '6018',
            link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6018',
            date: '2019-10-04',
            author: {
              name: 'Maher Santina',
            },
            comment_content:
              '<p>Thanks Jason for the explanation! appreciate the effort you put in the comment.<br>\nI wasn’t sure about your motives before you replied but now I understand where you come from, so I now know that this wasn’t your intention. But this is a User Experience issue. It’s not like you can disagree with it. It’s as if you’re developing an app and a user says that I think that this particular button is not in a good position and I find it not comfortable to use. You can’t just say that you disagree with that user. It’s just something he/she experienced. We all make mistakes and my intention wasn’t to call you out on yours, it was just to point out what I thought unpleasant, and maybe others might feel the same but didn’t bother to write it. I just wanted to share it with you because I’d need to know if any user is having a bad experience in my app and maybe you’d want to know too</p>',
            children: [
              {
                ID: '6020',
                link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6020',
                date: '2019-10-04',
                author: {
                  name: 'Jason Grigsby',
                },
                comment_content:
                  '<blockquote>\n<p>\n  But this is a User Experience issue. It’s not like you can disagree with it.\n</p>\n</blockquote>\n<p>I’m conflicted about this.</p>\n<p>On the one hand, I generally agree that when you write or say something and it lands in a way that isn’t what you intended, the intention doesn’t matter which is the point you’re making.</p>\n<p>On the other hand, I believe—and this may be where we disagree—that there is a generally agreed-upon definition of clickbait that we can use to evaluate the headline. For example, the <a href="https://en.wikipedia.org/wiki/Clickbait" rel="nofollow">WikiPedia entry</a> describes clickbait as:</p>\n<blockquote>\n<p>\n  Clickbait is a form of false advertisement which uses hyperlink text or a thumbnail link that is designed to attract attention and entice users to follow that link and read, view, or listen to the linked piece of online content, with a defining characteristic of being deceptive, typically sensationalized or misleading.\n</p>\n</blockquote>\n<p>Or as TechCrunch put it in <a href="https://techcrunch.com/2016/09/25/wtf-is-clickbait/" rel="nofollow">WTF is Clickbait</a>:</p>\n<blockquote>\n<p>\n  Clickbaiting is the intentional act of over-promising or otherwise misrepresenting — in a headline, on social media, in an image, or some combination — what you’re going to find when you read a story on the web.\n</p>\n</blockquote>\n<p>I don’t think the headline fits those definitions. As I said, I’m mostly proud of the headline because it states clearly what the article is about in as few words as possible.</p>\n<p>All that said, I can’t ignore that I’m writing in a period of time where people do encounter clickbait headlines all the time. So when I say that I can understand why the headline feels like clickbait to others, I mean that genuinely. I get it. Just because it doesn’t fit the definition of clickbait doesn’t mean that it doesn’t land as clickbait. I have no way of knowing what someone else’s experience will be like.</p>\n<p>Plus, maybe others disagree with the definition of clickbait headlines or disagree with my assertion that the headline doesn’t fit the definition.</p>\n<blockquote>\n<p>\n  I just wanted to share it with you because I’d need to know if any user is having a bad experience in my app and maybe you’d want to know too\n</p>\n</blockquote>\n<p>I honestly do want to know. I haven’t taken offense. Nor do I feel defensive. And I appreciate how cordial and gracious your correspondence has been.</p>\n<p>I like thinking about these questions and about the impact our words have. I appreciate the opportunity to reflect on the headline, how challenging it was to write it, and think about how I might have written it differently.</p>\n<p>At the moment, I don’t think that I would have written differently because this was the best of a bunch of bad headlines and because I do think it accurately describes the content. But you’ve given me food for thought and who knows, maybe a couple weeks from now I’ll think of a different headline that I wished I’d used instead.</p>\n<p>Thanks Maher!</p>',
                children: [
                  {
                    ID: '6021',
                    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
                    date: '2019-10-04',
                    author: {
                      name: 'Maher Santina',
                    },
                    comment_content:
                      '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',

                    is_child: true,
                  },
                ],
                is_child: true,
              },
              {
                ID: '6021',
                link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
                date: '2019-10-04',
                author: {
                  name: 'Maher Santina',
                },
                comment_content:
                  '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',
                is_child: true,
              },
            ],
            is_child: true,
          },
          {
            ID: '6020',
            link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6020',
            date: '2019-10-04',
            author: {
              name: 'Jason Grigsby',
            },
            comment_content:
              '<blockquote>\n<p>\n  But this is a User Experience issue. It’s not like you can disagree with it.\n</p>\n</blockquote>\n<p>I’m conflicted about this.</p>\n<p>On the one hand, I generally agree that when you write or say something and it lands in a way that isn’t what you intended, the intention doesn’t matter which is the point you’re making.</p>\n<p>On the other hand, I believe—and this may be where we disagree—that there is a generally agreed-upon definition of clickbait that we can use to evaluate the headline. For example, the <a href="https://en.wikipedia.org/wiki/Clickbait" rel="nofollow">WikiPedia entry</a> describes clickbait as:</p>\n<blockquote>\n<p>\n  Clickbait is a form of false advertisement which uses hyperlink text or a thumbnail link that is designed to attract attention and entice users to follow that link and read, view, or listen to the linked piece of online content, with a defining characteristic of being deceptive, typically sensationalized or misleading.\n</p>\n</blockquote>\n<p>Or as TechCrunch put it in <a href="https://techcrunch.com/2016/09/25/wtf-is-clickbait/" rel="nofollow">WTF is Clickbait</a>:</p>\n<blockquote>\n<p>\n  Clickbaiting is the intentional act of over-promising or otherwise misrepresenting — in a headline, on social media, in an image, or some combination — what you’re going to find when you read a story on the web.\n</p>\n</blockquote>\n<p>I don’t think the headline fits those definitions. As I said, I’m mostly proud of the headline because it states clearly what the article is about in as few words as possible.</p>\n<p>All that said, I can’t ignore that I’m writing in a period of time where people do encounter clickbait headlines all the time. So when I say that I can understand why the headline feels like clickbait to others, I mean that genuinely. I get it. Just because it doesn’t fit the definition of clickbait doesn’t mean that it doesn’t land as clickbait. I have no way of knowing what someone else’s experience will be like.</p>\n<p>Plus, maybe others disagree with the definition of clickbait headlines or disagree with my assertion that the headline doesn’t fit the definition.</p>\n<blockquote>\n<p>\n  I just wanted to share it with you because I’d need to know if any user is having a bad experience in my app and maybe you’d want to know too\n</p>\n</blockquote>\n<p>I honestly do want to know. I haven’t taken offense. Nor do I feel defensive. And I appreciate how cordial and gracious your correspondence has been.</p>\n<p>I like thinking about these questions and about the impact our words have. I appreciate the opportunity to reflect on the headline, how challenging it was to write it, and think about how I might have written it differently.</p>\n<p>At the moment, I don’t think that I would have written differently because this was the best of a bunch of bad headlines and because I do think it accurately describes the content. But you’ve given me food for thought and who knows, maybe a couple weeks from now I’ll think of a different headline that I wished I’d used instead.</p>\n<p>Thanks Maher!</p>',
            children: [
              {
                ID: '6021',
                link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
                date: '2019-10-04',
                author: {
                  name: 'Maher Santina',
                },
                comment_content:
                  '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',

                is_child: true,
              },
            ],
            is_child: true,
          },
          {
            ID: '6021',
            link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
            date: '2019-10-04',
            author: {
              name: 'Maher Santina',
            },
            comment_content:
              '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',
            is_child: true,
          },
        ],
        is_child: true,
      },
      {
        ID: '6018',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6018',
        date: '2019-10-04',
        author: {
          name: 'Maher Santina',
        },
        comment_content:
          '<p>Thanks Jason for the explanation! appreciate the effort you put in the comment.<br>\nI wasn’t sure about your motives before you replied but now I understand where you come from, so I now know that this wasn’t your intention. But this is a User Experience issue. It’s not like you can disagree with it. It’s as if you’re developing an app and a user says that I think that this particular button is not in a good position and I find it not comfortable to use. You can’t just say that you disagree with that user. It’s just something he/she experienced. We all make mistakes and my intention wasn’t to call you out on yours, it was just to point out what I thought unpleasant, and maybe others might feel the same but didn’t bother to write it. I just wanted to share it with you because I’d need to know if any user is having a bad experience in my app and maybe you’d want to know too</p>',
        children: [
          {
            ID: '6020',
            link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6020',
            date: '2019-10-04',
            author: {
              name: 'Jason Grigsby',
            },
            comment_content:
              '<blockquote>\n<p>\n  But this is a User Experience issue. It’s not like you can disagree with it.\n</p>\n</blockquote>\n<p>I’m conflicted about this.</p>\n<p>On the one hand, I generally agree that when you write or say something and it lands in a way that isn’t what you intended, the intention doesn’t matter which is the point you’re making.</p>\n<p>On the other hand, I believe—and this may be where we disagree—that there is a generally agreed-upon definition of clickbait that we can use to evaluate the headline. For example, the <a href="https://en.wikipedia.org/wiki/Clickbait" rel="nofollow">WikiPedia entry</a> describes clickbait as:</p>\n<blockquote>\n<p>\n  Clickbait is a form of false advertisement which uses hyperlink text or a thumbnail link that is designed to attract attention and entice users to follow that link and read, view, or listen to the linked piece of online content, with a defining characteristic of being deceptive, typically sensationalized or misleading.\n</p>\n</blockquote>\n<p>Or as TechCrunch put it in <a href="https://techcrunch.com/2016/09/25/wtf-is-clickbait/" rel="nofollow">WTF is Clickbait</a>:</p>\n<blockquote>\n<p>\n  Clickbaiting is the intentional act of over-promising or otherwise misrepresenting — in a headline, on social media, in an image, or some combination — what you’re going to find when you read a story on the web.\n</p>\n</blockquote>\n<p>I don’t think the headline fits those definitions. As I said, I’m mostly proud of the headline because it states clearly what the article is about in as few words as possible.</p>\n<p>All that said, I can’t ignore that I’m writing in a period of time where people do encounter clickbait headlines all the time. So when I say that I can understand why the headline feels like clickbait to others, I mean that genuinely. I get it. Just because it doesn’t fit the definition of clickbait doesn’t mean that it doesn’t land as clickbait. I have no way of knowing what someone else’s experience will be like.</p>\n<p>Plus, maybe others disagree with the definition of clickbait headlines or disagree with my assertion that the headline doesn’t fit the definition.</p>\n<blockquote>\n<p>\n  I just wanted to share it with you because I’d need to know if any user is having a bad experience in my app and maybe you’d want to know too\n</p>\n</blockquote>\n<p>I honestly do want to know. I haven’t taken offense. Nor do I feel defensive. And I appreciate how cordial and gracious your correspondence has been.</p>\n<p>I like thinking about these questions and about the impact our words have. I appreciate the opportunity to reflect on the headline, how challenging it was to write it, and think about how I might have written it differently.</p>\n<p>At the moment, I don’t think that I would have written differently because this was the best of a bunch of bad headlines and because I do think it accurately describes the content. But you’ve given me food for thought and who knows, maybe a couple weeks from now I’ll think of a different headline that I wished I’d used instead.</p>\n<p>Thanks Maher!</p>',
            children: [
              {
                ID: '6021',
                link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
                date: '2019-10-04',
                author: {
                  name: 'Maher Santina',
                },
                comment_content:
                  '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',

                is_child: true,
              },
            ],

            is_child: true,
          },
          {
            ID: '6021',
            link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
            date: '2019-10-04',
            author: {
              name: 'Maher Santina',
            },
            comment_content:
              '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',
            is_child: true,
          },
        ],
        is_child: true,
      },
      {
        ID: '6020',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6020',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<blockquote>\n<p>\n  But this is a User Experience issue. It’s not like you can disagree with it.\n</p>\n</blockquote>\n<p>I’m conflicted about this.</p>\n<p>On the one hand, I generally agree that when you write or say something and it lands in a way that isn’t what you intended, the intention doesn’t matter which is the point you’re making.</p>\n<p>On the other hand, I believe—and this may be where we disagree—that there is a generally agreed-upon definition of clickbait that we can use to evaluate the headline. For example, the <a href="https://en.wikipedia.org/wiki/Clickbait" rel="nofollow">WikiPedia entry</a> describes clickbait as:</p>\n<blockquote>\n<p>\n  Clickbait is a form of false advertisement which uses hyperlink text or a thumbnail link that is designed to attract attention and entice users to follow that link and read, view, or listen to the linked piece of online content, with a defining characteristic of being deceptive, typically sensationalized or misleading.\n</p>\n</blockquote>\n<p>Or as TechCrunch put it in <a href="https://techcrunch.com/2016/09/25/wtf-is-clickbait/" rel="nofollow">WTF is Clickbait</a>:</p>\n<blockquote>\n<p>\n  Clickbaiting is the intentional act of over-promising or otherwise misrepresenting — in a headline, on social media, in an image, or some combination — what you’re going to find when you read a story on the web.\n</p>\n</blockquote>\n<p>I don’t think the headline fits those definitions. As I said, I’m mostly proud of the headline because it states clearly what the article is about in as few words as possible.</p>\n<p>All that said, I can’t ignore that I’m writing in a period of time where people do encounter clickbait headlines all the time. So when I say that I can understand why the headline feels like clickbait to others, I mean that genuinely. I get it. Just because it doesn’t fit the definition of clickbait doesn’t mean that it doesn’t land as clickbait. I have no way of knowing what someone else’s experience will be like.</p>\n<p>Plus, maybe others disagree with the definition of clickbait headlines or disagree with my assertion that the headline doesn’t fit the definition.</p>\n<blockquote>\n<p>\n  I just wanted to share it with you because I’d need to know if any user is having a bad experience in my app and maybe you’d want to know too\n</p>\n</blockquote>\n<p>I honestly do want to know. I haven’t taken offense. Nor do I feel defensive. And I appreciate how cordial and gracious your correspondence has been.</p>\n<p>I like thinking about these questions and about the impact our words have. I appreciate the opportunity to reflect on the headline, how challenging it was to write it, and think about how I might have written it differently.</p>\n<p>At the moment, I don’t think that I would have written differently because this was the best of a bunch of bad headlines and because I do think it accurately describes the content. But you’ve given me food for thought and who knows, maybe a couple weeks from now I’ll think of a different headline that I wished I’d used instead.</p>\n<p>Thanks Maher!</p>',
        children: [
          {
            ID: '6021',
            link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
            date: '2019-10-04',
            author: {
              name: 'Maher Santina',
            },
            comment_content:
              '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',

            is_child: true,
          },
        ],
        is_child: true,
      },
      {
        ID: '6021',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6021',
        date: '2019-10-04',
        author: {
          name: 'Maher Santina',
        },
        comment_content:
          '<p>Thank Jason for the detailed comments!<br>\nOhh I agree it doesn’t fit the click-bait definitions that you shared. I might be mistaken when I said that, I would just say that it’s misleading, at least for me.<br>\nYou know what I thought when I read the title? I thought that Chiptole have designed a new HTML attribute and they’re selling it for 4.4M 😂 But to tell you honestly after I read the article and looked back at the title it made total sense<br>\nI’m happy that you’re not offended as this also wasn’t my intention!<br>\nYou reminded me of school days when we had to write an essay and the title had to be attractive to get a good grade! I always stumbled like 10 minutes just to write a title and then it would end up the cringiest thing 😂 So good job on that!<br>\nYes I totally understand that a person wouldn’t know the effect of their post or app design up front. One can only iterate on the data they collect from users after releasing something<br>\nThank you too! I would like to add you on Linked In but couldn’t find you😂 If you want to connect please add me “Maher Santina”</p>',
        is_child: true,
      },
    ],
  },
  {
    ID: '5997',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5997',
    date: '2019-10-04',
    author: {
      name: 'David',
    },
    comment_content:
      '<p>It seems like the lessons from Y2K have been forgotten. While I realize that it might seem silly to ask for the full 4 digits of the expiration year, I think if you asked someone that lived through the Y2K debacle it would send shivers down their spine not to. Am I correct that if this had been coded for a 4-digit year this problem never would have occurred?</p>',
    children: [
      {
        ID: '6007',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6007',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>Yes, if it asked for four digits for year, autofill would have worked properly.</p>\n<p>From the department of famous last words, I’m not certain how much we need to worry about an online credit card form still being in use 80 years from now.</p>\n<p>Credit cards expire frequently which means you don’t have an existing data problem. Credit card processors can handle two or four digits so if in 2090 you were still collecting two digits, they could change it to four digits until they passed 2100 and then switch back to two digits without too much work.</p>\n<p>That is assuming Chipotle still exists in 80 years, the form is still in use and we’re still using credit cards.</p>\n<p>Again, famous last words.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '5998',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-5998',
    date: '2019-10-04',
    author: {
      name: 'Konrad',
    },
    comment_content: '<p>This is AngularJS, not Angular.</p>',
    children: [
      {
        ID: '6005',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6005',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content:
          '<p>For those who, like me, may be unfamiliar with this distinction, in 2017, the Angular community <a href="https://blog.angularjs.org/2017/01/branding-guidelines-for-angular-and.html" rel="nofollow">decided</a> that Angular 1.0 would be called “AngularJS” and everything after 1.0 would be “Angular.”</p>\n<p>Thanks for the clarification about what version is being used here.</p>',

        is_child: true,
      },
    ],
  },
  {
    ID: '6002',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6002',
    date: '2019-10-04',
    author: {
      name: 'Colin ‘t Hart',
    },
    comment_content: '<p>So has Chipotle fixed their site?</p>',
    children: [
      {
        ID: '6008',
        link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6008',
        date: '2019-10-04',
        author: {
          name: 'Jason Grigsby',
        },
        comment_content: '<p>As of today, no.</p>',
        is_child: true,
      },
    ],
  },
  {
    ID: '6003',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6003',
    date: '2019-10-04',
    author: {
      name: 'Antonio Fernandes',
    },
    comment_content: '<p>Great job hunting that down!</p>',
  },
  {
    ID: '6023',
    link: 'https://cloudfour.com/thinks/an-html-attribute-potentially-worth-4-4m-to-chipotle/#comment-6023',
    date: '2019-10-05',
    author: {
      name: 'Damon',
    },
    comment_content:
      '<p>I would clarify that ‘pattern’ attribute is for input <em>validation</em>, whereas an input mask actually restricts typing invalid characters. So in theory (ie if implemented correctly, which was not the case here) the masking approach will reduce errors, which will likely increase conversions. With pattern I can still type “;;;;;hash” into a field that wants 4 numeric digits. So I’m suggesting  changing the mask to “9999” will be a better, preventative, approach and maybe net Chipotle a couple extra milli. (Especially if they accept 4 digit and 2 digit years both as valid which should be easy enough on the backend)</p>\n<p>I love the idea of the HTML form stuff but unfortunately the implementation varies so much from browser to browser that it often ends up a lil half baked. Max length is reliable though and very handy way of enforcing a limit without JS shenanigans. it’s really a shame it’s not supported by number inputs but max=9999 can achieve the same thing.</p>',
  },
];
