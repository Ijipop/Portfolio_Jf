'use client'

import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'

export type SiteType = 'vitrine' | 'portfolio' | 'boutique' | 'rdv' | 'app' | 'other' | ''
export type BudgetKey = 'under1000' | '1000_2500' | '2500plus' | 'discuss' | ''

export interface ProjectWebBriefState {
  siteType: SiteType
  siteTypeOther: string
  mainGoal: string
  pageHome: boolean
  pageServices: boolean
  pageProducts: boolean
  pageAbout: boolean
  pageContact: boolean
  pageFaq: boolean
  pageBlog: boolean
  pageOther: boolean
  pagesOtherDetail: string
  contentTexts: boolean
  contentPhotos: boolean
  contentBranding: boolean
  contentNeedHelp: boolean
  exampleLinks: string
  features: string
  deadline: string
  budget: BudgetKey
}

export function emptyProjectWebBrief(): ProjectWebBriefState {
  return {
    siteType: '',
    siteTypeOther: '',
    mainGoal: '',
    pageHome: false,
    pageServices: false,
    pageProducts: false,
    pageAbout: false,
    pageContact: false,
    pageFaq: false,
    pageBlog: false,
    pageOther: false,
    pagesOtherDetail: '',
    contentTexts: false,
    contentPhotos: false,
    contentBranding: false,
    contentNeedHelp: false,
    exampleLinks: '',
    features: '',
    deadline: '',
    budget: '',
  }
}

const DenseTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'textColor' && prop !== 'helperTextColor',
})<{ textColor?: string; helperTextColor?: string }>(({ theme, textColor, helperTextColor }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    fontSize: '0.875rem',
    color: textColor || '#fff',
    '& .MuiOutlinedInput-input': { color: textColor || '#fff' },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    color: textColor || '#fff',
    '&.Mui-focused': { color: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a' },
  },
  /** Outlined multiline : sur tablette/mobile, un peu d’air sous le label rétracté évite le chevauchement avec le contour. */
  '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(1.75),
    },
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.75rem',
    color: helperTextColor || 'rgba(255,255,255,0.65)',
  },
}))

interface ProjectWebBriefSectionProps {
  include: boolean
  onIncludeChange: (v: boolean) => void
  value: ProjectWebBriefState
  onChange: (next: ProjectWebBriefState) => void
  textColor: string
  compact?: boolean
}

export default function ProjectWebBriefSection({
  include,
  onIncludeChange,
  value,
  onChange,
  textColor,
  compact = false,
}: ProjectWebBriefSectionProps) {
  const { t } = useLanguage()
  const helper = `${textColor}B3`
  const gap = compact ? 1.5 : 2

  const patch = (partial: Partial<ProjectWebBriefState>) => {
    onChange({ ...value, ...partial })
  }

  return (
    <Box sx={{ mt: compact ? 1.5 : 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={include}
            onChange={(_, v) => onIncludeChange(v)}
            color="primary"
            size="small"
          />
        }
        label={
          <Typography variant="body2" sx={{ color: textColor, fontWeight: 500 }}>
            {t('contact.projectWeb.toggle')}
          </Typography>
        }
      />

      <Collapse in={include} timeout="auto" unmountOnExit={false}>
        <Box
          sx={{
            pt: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap,
            pl: { xs: 0, sm: 0.5 },
            borderLeft: { sm: `2px solid ${textColor}22` },
          }}
        >
          <Typography variant="subtitle2" sx={{ color: textColor, fontWeight: 600, letterSpacing: 0.02 }}>
            {t('contact.projectWeb.sectionTitle')}
          </Typography>

          <FormControl component="fieldset" variant="standard" sx={{ gap: 0.5 }}>
            <FormLabel component="legend" sx={{ color: textColor, fontSize: '0.8125rem', mb: 0.5 }}>
              {t('contact.projectWeb.q1')}
            </FormLabel>
            <RadioGroup
              value={value.siteType}
              onChange={(_, v) => patch({ siteType: v as SiteType })}
              name="siteType"
            >
              <FormControlLabel
                value="vitrine"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.siteVitrine')}</Typography>}
              />
              <FormControlLabel
                value="portfolio"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sitePortfolio')}</Typography>}
              />
              <FormControlLabel
                value="boutique"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.siteBoutique')}</Typography>}
              />
              <FormControlLabel
                value="rdv"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.siteRdv')}</Typography>}
              />
              <FormControlLabel
                value="app"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.siteApp')}</Typography>}
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.siteOther')}</Typography>}
              />
            </RadioGroup>
            {value.siteType === 'other' && (
              <DenseTextField
                size="small"
                fullWidth
                placeholder={t('contact.projectWeb.siteOtherPlaceholder')}
                value={value.siteTypeOther}
                onChange={(e) => patch({ siteTypeOther: e.target.value })}
                textColor={textColor}
                helperTextColor={helper}
                sx={{ mt: 0.5 }}
              />
            )}
          </FormControl>

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.projectWeb.q2')}
            placeholder={t('contact.projectWeb.q2Hint')}
            value={value.mainGoal}
            onChange={(e) => patch({ mainGoal: e.target.value })}
            multiline
            minRows={2}
            InputLabelProps={{ shrink: true }}
            textColor={textColor}
            helperTextColor={helper}
          />

          <Box>
            <Typography variant="caption" sx={{ color: textColor, display: 'block', mb: 0.75, fontWeight: 600 }}>
              {t('contact.projectWeb.q3')}
            </Typography>
            <Typography variant="caption" sx={{ color: textColor, display: 'block', mb: 0.75, opacity: 0.85, fontWeight: 400 }}>
              {t('contact.projectWeb.q3Hint')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageHome}
                    onChange={(_, v) => patch({ pageHome: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionHome')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageServices}
                    onChange={(_, v) => patch({ pageServices: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionServices')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageProducts}
                    onChange={(_, v) => patch({ pageProducts: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionProducts')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageAbout}
                    onChange={(_, v) => patch({ pageAbout: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionAbout')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageContact}
                    onChange={(_, v) => patch({ pageContact: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionContact')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageFaq}
                    onChange={(_, v) => patch({ pageFaq: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionFaq')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageBlog}
                    onChange={(_, v) => patch({ pageBlog: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionBlog')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.pageOther}
                    onChange={(_, v) => patch({ pageOther: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.sectionOther')}</Typography>}
              />
            </Box>
            {value.pageOther && (
              <DenseTextField
                size="small"
                fullWidth
                placeholder={t('contact.projectWeb.sectionOtherPlaceholder')}
                value={value.pagesOtherDetail}
                onChange={(e) => patch({ pagesOtherDetail: e.target.value })}
                textColor={textColor}
                helperTextColor={helper}
                sx={{ mt: 0.75 }}
              />
            )}
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: textColor, display: 'block', mb: 0.75, fontWeight: 600 }}>
              {t('contact.projectWeb.q4')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.contentTexts}
                    onChange={(_, v) => patch({ contentTexts: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.contentTexts')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.contentPhotos}
                    onChange={(_, v) => patch({ contentPhotos: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.contentPhotos')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.contentBranding}
                    onChange={(_, v) => patch({ contentBranding: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.contentBranding')}</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={value.contentNeedHelp}
                    onChange={(_, v) => patch({ contentNeedHelp: v })}
                    sx={{ py: 0.25 }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.contentNeedHelp')}</Typography>}
              />
            </Box>
          </Box>

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.projectWeb.q5')}
            placeholder={t('contact.projectWeb.q5Hint')}
            value={value.exampleLinks}
            onChange={(e) => patch({ exampleLinks: e.target.value })}
            multiline
            minRows={2}
            InputLabelProps={{ shrink: true }}
            textColor={textColor}
            helperTextColor={helper}
          />

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.projectWeb.q6')}
            placeholder={t('contact.projectWeb.q6Hint')}
            value={value.features}
            onChange={(e) => patch({ features: e.target.value })}
            multiline
            minRows={2}
            InputLabelProps={{ shrink: true }}
            textColor={textColor}
            helperTextColor={helper}
          />

          <DenseTextField
            size="small"
            fullWidth
            label={t('contact.projectWeb.q7')}
            placeholder={t('contact.projectWeb.q7Hint')}
            value={value.deadline}
            onChange={(e) => patch({ deadline: e.target.value })}
            textColor={textColor}
            helperTextColor={helper}
          />

          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ color: textColor, fontSize: '0.8125rem', mb: 0.5 }}>
              {t('contact.projectWeb.q8')}
            </FormLabel>
            <RadioGroup
              value={value.budget}
              onChange={(_, v) => patch({ budget: v as BudgetKey })}
              name="budget"
            >
              <FormControlLabel
                value="under1000"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.budgetUnder1000')}</Typography>}
              />
              <FormControlLabel
                value="1000_2500"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.budget1000_2500')}</Typography>}
              />
              <FormControlLabel
                value="2500plus"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.budget2500plus')}</Typography>}
              />
              <FormControlLabel
                value="discuss"
                control={<Radio size="small" sx={{ py: 0.25 }} />}
                label={<Typography variant="body2" sx={{ color: textColor }}>{t('contact.projectWeb.budgetDiscuss')}</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Collapse>
    </Box>
  )
}
