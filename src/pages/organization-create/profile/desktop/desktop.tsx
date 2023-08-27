import css from './desktop.module.scss';
import { Input } from '@atoms/input/input';
import { Textarea } from '@atoms/textarea/textarea';
import { Divider } from '@templates/divider/divider';
import Card from '@atoms/card';
import { Steps } from '@atoms/steps/steps';
import { Button } from '@atoms/button/button';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import { useState } from 'react';
import { DropdownItem } from '@atoms/dropdown-v2/dropdown.types';
import { formModel } from '../profile.form';
import { getCityList } from '@pages/job-create/info/info.services';
import { citiesToCategories } from '@core/adaptors';
import { Dropdown } from '@atoms/dropdown-v2/dropdown';
import { COUNTRIES } from '@constants/COUNTRIES';
import { Checkbox } from '@atoms/checkbox/checkbox';
import { formIsInvalid } from '../profile.services';
import clsx from 'clsx';

const sharedProps: Record<string, string> = {
  className: css.input,
  variant: 'outline',
};

export const Desktop = (): JSX.Element => {
  const { updateField, profileForm, formState, navigateToSocialCauses, navigateToMission } =
    useOrganizationCreateShared();
  const [cities, setCities] = useState<DropdownItem[]>([]);

  Object.keys(formModel(formState)).forEach((prop) => {
    const p = prop as keyof ReturnType<typeof formModel>;
    profileForm.controls[prop].subscribe((v) => updateField(p, v));
  });

  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }

  return (
    <div className={css.container}>
      <Card className={clsx(css.card, "p0")}>
        <div className={css.header}>
          <div className={css.chevron} onClick={navigateToSocialCauses}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={3} />
          </div>
        </div>
        <div className={css.questionContainer}>
          <div className={css.question}>Organization profile</div>
          <div className={css.limitStatement}>Fill the required fields</div>
        </div>
        <div className={css.main}>
          <Divider title="Basic info" divider="space">
            <div className={css.formContainer}>
              <Input
                register={profileForm}
                name="organizationName"
                label="Organization name"
                placeholder="Organization name"
              />
              <Textarea
                limit={160}
                register={profileForm}
                name="bio"
                label="Bio"
                placeholder="Your organization's bio"
              />
            </div>
          </Divider>
          <Divider title="Contact" divider="space">
            <div className={css.formContainer}>
              <Input
                register={profileForm}
                name="organizationEmail"
                label="Organization email"
                placeholder="Organization email"
              />
              <Dropdown
                label="Country"
                placeholder="country"
                name="country"
                list={COUNTRIES}
                value={formState.country}
                register={profileForm}
                onValueChange={(option) => {
                  updateCityList(option.value as string);
                }}
              />
              <Dropdown
                register={profileForm}
                label="City"
                placeholder="city"
                name="city"
                value={formState.city}
                onValueChange={(options) => updateField('geoname_id', options.id)}
                list={cities}
              />
              <Input register={profileForm} name="address" optional label="Address" placeholder="Address" />
              <div>
                <div className={css.phoneNumberLabel}>
                  Phone Number <span className={css.labelOptional}>(optional)</span>
                </div>
                <div className={css.phoneNumber}>
                  <Input register={profileForm} name="countryMobileCode" optional placeholder="+1" />
                  <Input register={profileForm} name="phoneNumber" optional placeholder="Phone number" />
                </div>
              </div>
              <Input register={profileForm} name="website" optional label="Website" placeholder="Website" />
              <div className={css.agreement}>
                <Checkbox
                  name="agreement"
                  register={profileForm}
                  label="I verify that I am an authorized representative of this organization and have the right to act on its behalf
                in the creation and management of this page."
                  id="agreement"
                  checked={formState.agreement}
                />
                <span></span>
              </div>
            </div>
          </Divider>
        </div>
        <div className={css.bottom}>
          <Button disabled={formIsInvalid(profileForm.isValid, formState)} onClick={navigateToMission}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};
