# Third-Party Badges on Scroll Canvas

This repository is dedicated to collecting third-party badges that users can mint on Scroll website. You can see the third-party badges currently listed on [Scroll Ecosystem](https://scroll.io/ecosystem#badges).

Once your badge is listed, it means:
1. Users can see this badge on the Scroll website and check eligibility as well as mint the badge.
2. When users view their badges on [Scroll Canvas](https://scroll.io/canvas), they can see the badge issuer information.
3. Users can share this badge on Scroll Canvas.


## Before You Begin
We support three types of badges: **Permissionless**, **Backend-authorized**, and **Airdropped**. The preparation required varies for different types of badges.

Here are some **basic requirements**:
1.  The badge contract have been deployed on the **Scroll Mainnet**.
2. The badge contract implements [defaultTokenURI](https://github.com/scroll-tech/canvas-contracts/blob/master/src/badge/extensions/ScrollBadgeDefaultURI.sol).
3. Your project is listed on [Scroll Ecosystem - Browse all protocols](https://scroll.io/ecosystem#protocols) as it contains the issuer information.
4. All URLs mentioned above are configured for cross-origin access on `https://scroll.io`.

Here are some **specific requirements** for different types of badges:
* **Permissionless**
  1. Nothing special.  
* **Backend-authorized**
  1. The check API and claim API have been deployed to production. For API requirements, please refer to: [Badge APIs](https://scrollzkp.notion.site/Badge-APIs-95890d7ca14944e2a6d34835ceb6b914).
  2. The attester proxy contract  have been deployed on the **Scroll Mainnet**. 
* **Airdropped**
  1. The check API have been deployed to production. For API requirements, please refer to: [Badge APIs](https://scrollzkp.notion.site/Badge-APIs-95890d7ca14944e2a6d34835ceb6b914).

## Submission Steps

#### 1. Open an Issue

**Select the badge type you want to submit and carefully read the notes for each field as you fill out the form.**
![new issue](https://github.com/user-attachments/assets/3dd4a033-ccf6-4185-aac4-35c8d0f50b15)

![choose issue template](https://github.com/user-attachments/assets/e67e81df-9813-4cf1-9b63-990a1798b934)


**Then, a pr will be created**

![new pr](https://github.com/user-attachments/assets/48c164d0-509d-4f56-a4c8-760624a210cb)

![pr detail](https://github.com/user-attachments/assets/5c569e21-4562-4462-839f-261edf768863)


#### 2. Pr Review

Typically, we review existing PRs every day, starting at 2:00 AM UTC. You will be notified of any required changes or approvals.

#### 3. Badge Listing

Upon approval, your badge will be added to the list and will appear on [Scroll website](https://scroll.io/ecosystem#badges) for users to mint. Additionally, all third-party badges displayed on the Scroll website are listed in [scroll.badgelist.json](https://github.com/scroll-tech/canvas-badges/blob/main/scroll.badgelist.json). If you see your badge in this list, it means all Scroll users can mint it, provided their wallet address is eligible.
![ecosystem protocols](https://github.com/user-attachments/assets/d8331be2-9ddb-494a-8f92-b131f5e60809)


## After Badge Listed

You can visit `https://scroll.io/canvas/badge-contract/{{badgeContractAddress}}` to confirm that the badge is working as expected. This will help our users quickly and smoothly mint the badge you issued.

1. Please review the information on the badge detail page:
	* Ensure the basic information of the badge is as expected.
 	* Verify that the **check API** is working correctly (we recommend testing with a wallet account eligible to mint this badge). If possible, try minting one yourself to confirm the **claim API** is functioning properly.
2. To ensure the availability of the check API and claim API, we recommend maintaining a TPS around 300. If your API serves multiple badges simultaneously, please increase the TPS accordingly. Additionally, please monitor the server logs to stay informed of any issues.


## Get in Touch with Us

If you encounter any issues or have any questions, feel free to contact us.
