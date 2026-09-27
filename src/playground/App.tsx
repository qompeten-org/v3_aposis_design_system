import React, { useState, useMemo } from "react";
import {
  Button,
  type ButtonVariant,
  type ButtonSize,
  Input,
  Badge,
  Avatar,
  Spinner,
  Checkbox,
  Heading,
  Text,
  Icon,
  IconLanguageId,
  IconLanguageEn,
  IconMathSqrt,
  Link,
  Radio,
  RadioGroup,
} from "../atoms";
import {
  FormField,
  SearchBar,
  Alert,
  Modal,
  Tabs,
  Tooltip,
  type TooltipPosition,
  type TooltipSize,
  type TooltipVariant,
  Notification,
  NotificationContainer,
  notification,
  type NotificationVariant,
  type NotificationPosition,
  type NotificationMultiStyle,
  Toggle,
  Breadcrumbs,
  Dropdown,
  ProgressBar,
  Tag,
  TagGroup,
  OverflowMenu,
  PasswordInput,
} from "../molecules";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  Navbar,
  Sidebar,
  DataTable,
  type Column,
  Accordion,
  type AccordionSize,
  type AccordionWidth,
  ChartHeader,
  ProgressIndicator,
} from "../organisms";
import {
  IconComponents,
  IconLayout,
  IconCode,
  IconCopy,
  IconCheck,
  IconUsers,
  IconTrendingUp,
  IconSettings,
  IconPlus,
  IconSend,
  IconTrash,
  IconSparkles,
  IconSearch,
  IconHeart,
  IconCalendar,
  IconSun,
  IconMoon,
  IconPalette,
  IconLayersSubtract,
  IconBorderAll,
  IconShadow,
  IconTypography,
  IconRuler2,
  IconClick,
  IconForms,
  IconIdBadge,
  IconUser,
  IconLoader,
  IconCheckbox,
  IconCircleDot,
  IconAlertCircle,
  IconWindow,
  IconMenu2,
  IconX,
  IconArrowRight,
  IconDeviceFloppy,
  IconDownload,
  IconEdit,
  IconChevronDown,
  IconAdjustmentsHorizontal,
  IconInfoCircle,
  IconHelpCircle,
  IconBell,
  IconToggleLeft,
  IconLayoutList,
  IconSelector,
  IconActivity,
  IconTags,
  IconDotsVertical,
  IconLock,
  IconTable,
  IconChartPie,
} from "@tabler/icons-react";
import { units } from "../tokens/units";
import { primitiveColors } from "../tokens/colors";
import { generateBreadcrumbs } from "../utils/breadcrumbs";

interface StudentData {
  id: string;
  name: string;
  nisn: string;
  class: string;
  status: "active" | "graduated" | "pending";
  gpa: number;
}

const mockStudents: StudentData[] = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nisn: "0051283921",
    class: "XII IPA 1",
    status: "active",
    gpa: 3.85,
  },
  {
    id: "2",
    name: "Siti Rahmawati",
    nisn: "0058291032",
    class: "XII IPA 2",
    status: "active",
    gpa: 3.92,
  },
  {
    id: "3",
    name: "Budi Santoso",
    nisn: "0049281729",
    class: "XII IPS 1",
    status: "graduated",
    gpa: 3.65,
  },
  {
    id: "4",
    name: "Dewi Lestari",
    nisn: "0057192834",
    class: "XI IPA 3",
    status: "pending",
    gpa: 3.4,
  },
  {
    id: "5",
    name: "Rizky Pratama",
    nisn: "0053918274",
    class: "X-B",
    status: "active",
    gpa: 3.78,
  },
];

interface FigmaMockRow {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
  col9: string;
  col10: string;
}

const figmaMockData: FigmaMockRow[] = [
  { id: "1", col1: "Data text", col2: "Data text", col3: "Data text", col4: "Data text", col5: "Data text", col6: "Data text", col7: "Data text", col8: "Data text", col9: "Data text", col10: "Data text" },
  { id: "2", col1: "Data text", col2: "Data text", col3: "Data text", col4: "Data text", col5: "Data text", col6: "Data text", col7: "Data text", col8: "Data text", col9: "Data text", col10: "Data text" },
  { id: "3", col1: "Data text", col2: "Data text", col3: "Data text", col4: "Data text", col5: "Data text", col6: "Data text", col7: "Data text", col8: "Data text", col9: "Data text", col10: "Data text" },
  { id: "4", col1: "Data text", col2: "Data text", col3: "Data text", col4: "Data text", col5: "Data text", col6: "Data text", col7: "Data text", col8: "Data text", col9: "Data text", col10: "Data text" },
  { id: "5", col1: "Data text", col2: "Data text", col3: "Data text", col4: "Data text", col5: "Data text", col6: "Data text", col7: "Data text", col8: "Data text", col9: "Data text", col10: "Data text" },
];

const BUTTON_SPEC_MODES = [
  {
    id: "primary",
    name: "Blue Mode (Primary)",
    desc: "Solid brand blue untuk tindakan utama / primer",
    variant: "primary" as ButtonVariant,
    badge: "Brand Blue",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    hoverClass: "bg-aposis-blue-70 shadow",
    activeClass: "bg-aposis-blue-80",
    focusRing:
      "ring-2 ring-offset-2 ring-aposis-blue-60 ring-offset-white dark:ring-offset-slate-900",
  },
  {
    id: "secondary",
    name: "Dark Mode (Secondary)",
    desc: "Solid dark slate / black untuk aksi netral kontras tinggi",
    variant: "secondary" as ButtonVariant,
    badge: "Slate 900",
    badgeClass:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    hoverClass: "bg-slate-800 dark:bg-slate-700",
    activeClass: "bg-slate-950 dark:bg-slate-900",
    focusRing:
      "ring-2 ring-offset-2 ring-slate-700 ring-offset-white dark:ring-offset-slate-900",
  },
  {
    id: "outline",
    name: "Outline Mode",
    desc: "Bordered light background untuk tindakan sekunder",
    variant: "outline" as ButtonVariant,
    badge: "Bordered",
    badgeClass:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    hoverClass: "bg-slate-100 border-slate-400 dark:bg-slate-800",
    activeClass: "bg-slate-200 dark:bg-slate-700",
    focusRing:
      "ring-2 ring-offset-2 ring-aposis-blue-60 ring-offset-white dark:ring-offset-slate-900",
  },
  {
    id: "subtle",
    name: "Subtle / Ghost Mode",
    desc: "Soft tint blue & transparan untuk aksi pendukung / tertier",
    variant: "subtle" as ButtonVariant,
    badge: "Soft Tint",
    badgeClass: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    hoverClass: "bg-blue-100 dark:bg-blue-950/80",
    activeClass: "bg-blue-200 dark:bg-blue-900/60",
    focusRing:
      "ring-2 ring-offset-2 ring-aposis-blue-60 ring-offset-white dark:ring-offset-slate-900",
  },
  {
    id: "danger",
    name: "Red Mode (Danger / Destructive)",
    desc: "Solid rose red untuk tindakan destruktif atau peringatan kritis",
    variant: "danger" as ButtonVariant,
    badge: "Critical Action",
    badgeClass: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
    hoverClass: "bg-rose-700 shadow",
    activeClass: "bg-rose-800",
    focusRing:
      "ring-2 ring-offset-2 ring-rose-500 ring-offset-white dark:ring-offset-slate-900",
  },
  {
    id: "danger-outline",
    name: "Red Outline & Subtle Mode",
    desc: "Border merah dan soft tint red untuk konfirmasi hapus",
    variant: "danger-outline" as ButtonVariant,
    badge: "Destructive Border",
    badgeClass: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    hoverClass: "bg-rose-50 border-rose-400 dark:bg-rose-950/40",
    activeClass: "bg-rose-100 dark:bg-rose-950/70",
    focusRing:
      "ring-2 ring-offset-2 ring-rose-500 ring-offset-white dark:ring-offset-slate-900",
  },
];

function ButtonV31SpecMatrix() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredModes =
    selectedFilter === "all"
      ? BUTTON_SPEC_MODES
      : BUTTON_SPEC_MODES.filter((m) => m.id === selectedFilter);

  const sizesConfig: {
    size: ButtonSize;
    label: string;
    px: string;
    iconSize: "xs" | "sm" | "md";
  }[] = [
    { size: "lg", label: "Large (LG)", px: "48px", iconSize: "sm" },
    { size: "md", label: "Medium (MD)", px: "40px", iconSize: "sm" },
    { size: "sm", label: "Small (SM)", px: "32px", iconSize: "xs" },
    { size: "xs", label: "Extra Small (XS)", px: "28px", iconSize: "xs" },
  ];

  const states = [
    { id: "default", label: "Default", badge: "Normal" },
    { id: "hover", label: "Hover", badge: "Mouse Over" },
    { id: "active", label: "Pressed", badge: "Active" },
    { id: "focus", label: "Focus", badge: "Ring 2px" },
    { id: "disabled", label: "Disabled", badge: "Nonaktif" },
    { id: "skeleton", label: "Skeleton", badge: "Loading Pulse" },
  ];

  return (
    <Card className="overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <CardHeader className="border-b bg-slate-50/70 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-aposis-blue-60 animate-pulse" />
              Matriks Spesifikasi Button v3.1 (Resmi Figma)
            </CardTitle>
            <CardDescription>
              Hierarki varian tombol dalam 4 ukuran (LG, MD, SM, XS) serta 6
              status interaksi (Default, Hover, Active, Focus, Disabled,
              Skeleton)
            </CardDescription>
          </div>
          {/* Mode Filter Buttons */}
          <div className="flex flex-wrap gap-1 p-1 text-xs bg-white border dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedFilter === "all"
                  ? "bg-aposis-blue-60 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Semua Mode ({BUTTON_SPEC_MODES.length})
            </button>
            {BUTTON_SPEC_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedFilter(m.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedFilter === m.id
                    ? "bg-aposis-blue-60 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {m.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[880px] divide-y divide-slate-100 dark:divide-slate-800">
            {/* Table Header: Sizes */}
            <div className="grid grid-cols-9 px-4 py-3 text-xs font-semibold border-b bg-slate-100/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
              <div className="col-span-1">Status / State</div>
              {sizesConfig.map((s) => (
                <React.Fragment key={s.size}>
                  <div className="col-span-1 text-center">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {s.label.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      {s.px} • Text
                    </span>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {s.label.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      Icon Only
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Render Each Mode Section */}
            {filteredModes.map((mode) => (
              <div
                key={mode.id}
                className="p-4 space-y-3 bg-white dark:bg-slate-900"
              >
                {/* Section Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {mode.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${mode.badgeClass}`}
                    >
                      {mode.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{mode.desc}</span>
                </div>

                {/* 6 State Rows */}
                <div className="space-y-2">
                  {states.map((st) => (
                    <div
                      key={st.id}
                      className="grid grid-cols-9 items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex flex-col col-span-1">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {st.label}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {st.badge}
                        </span>
                      </div>

                      {sizesConfig.map((s) => {
                        const icon = <Icon icon={IconPlus} size={s.iconSize} />;
                        const isSkeleton = st.id === "skeleton";
                        const isDisabled = st.id === "disabled";
                        const additionalClass =
                          st.id === "hover"
                            ? mode.hoverClass
                            : st.id === "active"
                              ? mode.activeClass
                              : st.id === "focus"
                                ? mode.focusRing
                                : undefined;

                        return (
                          <React.Fragment key={s.size}>
                            {/* Text + Icon Button */}
                            <div className="flex justify-center col-span-1">
                              <Button
                                variant={mode.variant}
                                size={s.size}
                                leftIcon={icon}
                                disabled={isDisabled}
                                skeleton={isSkeleton}
                                className={additionalClass}
                              >
                                Button
                              </Button>
                            </div>

                            {/* Icon-Only Button */}
                            <div className="flex justify-center col-span-1">
                              <Button
                                variant={mode.variant}
                                size={s.size}
                                iconOnly
                                leftIcon={icon}
                                disabled={isDisabled}
                                skeleton={isSkeleton}
                                className={additionalClass}
                                aria-label="Aksi"
                              />
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const autoGeneratedItems = generateBreadcrumbs(
  "/dashboard/settings/user-profile",
).map((item) => ({
  label: item.label,
  href: item.url,
}));

function AccordionDemoContent() {
  const items = Array.from({ length: 6 });
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        Lorem ipsum dolor sit lorem a amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>

      <div className="space-y-3">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between gap-3 pt-3 border-t md:flex-row md:items-center border-slate-100 dark:border-slate-800 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-blue-600 border-2 border-blue-500 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 dark:text-blue-400 shrink-0">
                0
              </div>

              <div className="min-w-0 space-y-1">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Subtitle
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500">
                  + Subtitle
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <div className="relative flex items-center h-1.5 rounded-full w-36 sm:w-48 bg-slate-200 dark:bg-slate-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full -ml-0.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    0%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
              {Array.from({ length: 6 }).map((__, tagIdx) => (
                <span
                  key={tagIdx}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Tag
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState("button");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifActive, setIsNotifActive] = useState<boolean>(false);
  const mainRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedId]);

  // Component test states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValue, setMultiValue] = useState<string[]>(["1", "2"]);
  const [tablePage, setTablePage] = useState(1);
  const [sidebarDemoCollapsed, setSidebarDemoCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [activeTabDemo, setActiveTabDemo] = useState("tab1");
  const [chartHeaderTitle, setChartHeaderTitle] = useState<string>("Chart title");
  const [chartHeaderSubtitle, setChartHeaderSubtitle] = useState<string>("Chart title");
  const [activeChartType, setActiveChartType] = useState<string>("bar");
  const [activeTags, setActiveTags] = useState<string[]>(["Tag"]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const sampleProgressSteps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ];

  const progressIndicatorSnippets: SnippetItem[] = [
    {
      label: 'React',
      code: `<ProgressIndicator
    steps={[
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' }
    ]}
    currentStep={${activeStepIndex}}
    onStepClick={(index) => setActiveStepIndex(index)}
  />`,
    },
  ];

  // Interactive Radio Configurator state
  const [radioConfigVariant, setRadioConfigVariant] = useState<
    "default" | "card"
  >("default");
  const [radioConfigSize, setRadioConfigSize] = useState<"sm" | "md" | "lg">(
    "md",
  );
  const [radioConfigLabelPos, setRadioConfigLabelPos] = useState<
    "right" | "left" | "bottom" | "top" | "none"
  >("right");
  const [radioConfigMode, setRadioConfigMode] = useState<"group" | "single">(
    "group",
  );
  const [radioConfigOrientation, setRadioConfigOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [radioConfigDisabled, setRadioConfigDisabled] = useState(false);
  const [radioConfigInvalid, setRadioConfigInvalid] = useState(false);
  const [radioConfigHasDesc, setRadioConfigHasDesc] = useState(false);
  const [radioConfigWrapForm, setRadioConfigWrapForm] = useState(false);
  const [radioConfigSelected, setRadioConfigSelected] = useState("opt1");
  const [radioConfigCustomLabel, setRadioConfigCustomLabel] =
    useState("Pilihan Utama");

  // Interactive Tooltip Configurator state
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition>("top");
  const [tooltipSize, setTooltipSize] = useState<TooltipSize>("md");
  const [tooltipVariant, setTooltipVariant] =
    useState<TooltipVariant>("default");
  const [tooltipArrow, setTooltipArrow] = useState<boolean>(true);
  const [tooltipText, setTooltipText] = useState<string>("Tooltip text");
  const [tooltipTriggerText, setTooltipTriggerText] =
    useState<string>("Definition tooltip");

  // Interactive Notification Configurator state
  const [notifVariant, setNotifVariant] = useState<NotificationVariant>("info");
  const [notifPos, setNotifPos] = useState<NotificationPosition>("top-right");
  const [notifMultiStyle, setNotifMultiStyle] =
    useState<NotificationMultiStyle>("default");
  const [notifShowProgress, setNotifShowProgress] = useState<boolean>(true);
  const [notifTeks, setNotifTeks] = useState<string>("Notification");
  const [notifDescription, setNotifDescription] = useState<string>(
    "Information notification message",
  );
  const [notifDuration, setNotifDuration] = useState<number>(4000);
  const [notifHasAction, setNotifHasAction] = useState<boolean>(true);
  const [notifActionLabel, setNotifActionLabel] = useState<string>("Action");
  const [notifCustomIcon, setNotifCustomIcon] = useState<boolean>(false);
  const [notifPreviewKey, setNotifPreviewKey] = useState<number>(0);

  // Interactive Button Configurator state
  const [demoVariant, setDemoVariant] = useState<ButtonVariant>("primary");
  const [demoSize, setDemoSize] = useState<ButtonSize>("md");
  const [demoIsIconOnly, setDemoIsIconOnly] = useState(false);
  const [demoIsSkeleton, setDemoIsSkeleton] = useState(false);
  const [demoHasLeftIcon, setDemoHasLeftIcon] = useState(true);
  const [demoLeftIconName, setDemoLeftIconName] = useState<string>("IconPlus");
  const [demoHasRightIcon, setDemoHasRightIcon] = useState(false);
  const [demoRightIconName, setDemoRightIconName] =
    useState<string>("IconArrowRight");
  const [demoCustomId, setDemoCustomId] = useState("btn-simpan");
  const [demoCustomClass, setDemoCustomClass] = useState("");
  const [demoButtonText, setDemoButtonText] = useState("Button");
  const [demoIsLoading, setDemoIsLoading] = useState(false);
  const [demoIsDisabled, setDemoIsDisabled] = useState(false);

  // Interactive Accordion Configurator state
  const [accordionSize, setAccordionSize] = useState<AccordionSize>("md");
  const [accordionWidth, setAccordionWidth] = useState<AccordionWidth>("full");
  const [accordionTitle, setAccordionTitle] = useState<string>("Title");
  const [accordionSubtitle, setAccordionSubtitle] = useState<string>("");
  const [accordionDisabled, setAccordionDisabled] = useState<boolean>(false);
  const [accordionPreviewKey, setAccordionPreviewKey] = useState<number>(0);

  // Interactive DataTable Configurator state
  const [dtTitle, setDtTitle] = useState<string>("Title");
  const [dtDescription, setDtDescription] = useState<string>("Description");
  const [dtSearchable, setDtSearchable] = useState<boolean>(true);
  const [dtSelectable, setDtSelectable] = useState<boolean>(true);
  const [dtExpandable, setDtExpandable] = useState<boolean>(true);
  const [dtHasToolbarActions, setDtHasToolbarActions] = useState<boolean>(true);
  const [dtHasPagination, setDtHasPagination] = useState<boolean>(true);
  const [dtIsLoading, setDtIsLoading] = useState<boolean>(false);
  const [dtIsEmpty, setDtIsEmpty] = useState<boolean>(false);
  const [dtPage, setDtPage] = useState<number>(1);
  const [dtSelectedRows, setDtSelectedRows] = useState<(string | number)[]>([]);
  const [dtExpandedRows, setDtExpandedRows] = useState<(string | number)[]>([]);

  // Standalone showcase states for DataTable modes
  const [showcase1Page, setShowcase1Page] = useState<number>(1);
  const [showcase2Expanded, setShowcase2Expanded] = useState<(string | number)[]>(["1"]);
  const [showcase2Page, setShowcase2Page] = useState<number>(1);
  const [showcase3Selected, setShowcase3Selected] = useState<(string | number)[]>(["2", "4"]);
  const [showcase3Page, setShowcase3Page] = useState<number>(1);
  const [showcase4Selected, setShowcase4Selected] = useState<(string | number)[]>(["1", "3"]);
  const [showcase4Expanded, setShowcase4Expanded] = useState<(string | number)[]>(["2"]);
  const [showcase4Page, setShowcase4Page] = useState<number>(1);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const demoIcons: Record<string, { label: string; icon: any }> = {
    IconPlus: { label: "Plus (Tambah)", icon: IconPlus },
    IconDeviceFloppy: { label: "Floppy (Simpan)", icon: IconDeviceFloppy },
    IconSearch: { label: "Search (Cari)", icon: IconSearch },
    IconDownload: { label: "Download (Unduh)", icon: IconDownload },
    IconEdit: { label: "Edit (Ubah)", icon: IconEdit },
    IconArrowRight: { label: "ArrowRight (Lanjut)", icon: IconArrowRight },
    IconSend: { label: "Send (Kirim)", icon: IconSend },
    IconTrash: { label: "Trash (Hapus)", icon: IconTrash },
    IconChevronDown: { label: "ChevronDown (Dropdown)", icon: IconChevronDown },
    IconSettings: { label: "Settings (Pengaturan)", icon: IconSettings },
    IconHeart: { label: "Heart (Favorit)", icon: IconHeart },
  };

  const dynamicButtonCode = useMemo(() => {
    const imports = ["Button"];
    if (demoHasLeftIcon || demoHasRightIcon) imports.push("Icon");

    const iconImports = new Set<string>();
    if (demoHasLeftIcon) iconImports.add(demoLeftIconName);
    if (demoHasRightIcon) iconImports.add(demoRightIconName);

    let res = `import { ${imports.join(", ")} } from '@aposis/design-system';\n`;
    if (iconImports.size > 0) {
      res += `import { ${Array.from(iconImports).join(", ")} } from '@tabler/icons-react';\n`;
    }
    res += `\n<Button`;
    if (demoCustomId.trim()) res += `\n  id="${demoCustomId.trim()}"`;
    if (demoVariant !== "primary") res += `\n  variant="${demoVariant}"`;
    if (demoSize !== "md") res += `\n  size="${demoSize}"`;
    if (demoIsIconOnly) res += `\n  iconOnly`;
    if (demoIsSkeleton) res += `\n  skeleton`;
    if (demoHasLeftIcon)
      res += `\n  leftIcon={<Icon icon={${demoLeftIconName}} size="${demoSize === "lg" ? "md" : demoSize === "xs" ? "xs" : "sm"}" />}`;
    if (demoHasRightIcon && !demoIsIconOnly)
      res += `\n  rightIcon={<Icon icon={${demoRightIconName}} size="${demoSize === "lg" ? "md" : demoSize === "xs" ? "xs" : "sm"}" />}`;
    if (demoIsLoading) res += `\n  isLoading`;
    if (demoIsDisabled) res += `\n  disabled`;
    if (demoCustomClass.trim())
      res += `\n  className="${demoCustomClass.trim()}"`;
    if (demoIsIconOnly || demoIsSkeleton) {
      res += `\n/>`;
    } else {
      res += `\n>\n  ${demoButtonText}\n</Button>`;
    }
    return res;
  }, [
    demoVariant,
    demoSize,
    demoIsIconOnly,
    demoIsSkeleton,
    demoHasLeftIcon,
    demoLeftIconName,
    demoHasRightIcon,
    demoRightIconName,
    demoCustomId,
    demoCustomClass,
    demoButtonText,
    demoIsLoading,
    demoIsDisabled,
  ]);

  const dynamicRadioCode = useMemo(() => {
    const isGroup = radioConfigMode === "group";
    const imports = new Set<string>();
    if (radioConfigWrapForm) imports.add("FormField");
    if (isGroup) imports.add("RadioGroup");
    imports.add("Radio");

    let code = `import React, { useState } from 'react';\nimport { ${Array.from(imports).join(", ")} } from '@aposis/design-system';\n\n`;

    const labelPosAttr =
      radioConfigLabelPos !== "right" && radioConfigLabelPos !== "none"
        ? `\n  labelPosition="${radioConfigLabelPos}"`
        : "";
    const sizeAttr =
      radioConfigSize !== "md" ? `\n  size="${radioConfigSize}"` : "";
    const variantAttr =
      radioConfigVariant !== "default"
        ? `\n  variant="${radioConfigVariant}"`
        : "";
    const disabledAttr = radioConfigDisabled ? `\n  disabled` : "";
    const invalidAttr = radioConfigInvalid ? `\n  isInvalid` : "";

    if (isGroup) {
      code += `const [selectedValue, setSelectedValue] = useState('${radioConfigSelected}');\n\n`;

      let groupContent = `<RadioGroup\n  name="pilihan"\n  value={selectedValue}\n  onChange={setSelectedValue}`;
      if (radioConfigOrientation !== "vertical")
        groupContent += `\n  orientation="${radioConfigOrientation}"`;
      groupContent += `${sizeAttr}${variantAttr}${labelPosAttr}${disabledAttr}${invalidAttr}`;
      if (radioConfigVariant === "card")
        groupContent += `\n  className="grid grid-cols-1 gap-3 sm:grid-cols-2"`;
      groupContent += `\n>\n`;

      const options = [
        {
          val: "opt1",
          label: radioConfigLabelPos === "none" ? undefined : "Opsi Pertama",
          desc: radioConfigHasDesc
            ? "Keterangan pembantu untuk opsi 1"
            : undefined,
        },
        {
          val: "opt2",
          label: radioConfigLabelPos === "none" ? undefined : "Opsi Kedua",
          desc: radioConfigHasDesc
            ? "Keterangan pembantu untuk opsi 2"
            : undefined,
        },
        {
          val: "opt3",
          label: radioConfigLabelPos === "none" ? undefined : "Opsi Ketiga",
          desc: radioConfigHasDesc
            ? "Keterangan pembantu untuk opsi 3"
            : undefined,
        },
      ];

      options.forEach((opt) => {
        groupContent += `  <Radio value="${opt.val}"`;
        if (opt.label) groupContent += ` label="${opt.label}"`;
        else groupContent += ` aria-label="Opsi ${opt.val}"`;
        if (opt.desc && radioConfigLabelPos !== "none")
          groupContent += ` description="${opt.desc}"`;
        groupContent += ` />\n`;
      });
      groupContent += `</RadioGroup>`;

      if (radioConfigWrapForm) {
        code += `<FormField\n  label="Pilih Kategori"\n  required\n  helperText="Pilih salah satu opsi yang tersedia"${radioConfigInvalid ? '\n  error="Wajib memilih salah satu opsi"' : ""}\n>\n`;
        code += groupContent
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n");
        code += `\n</FormField>`;
      } else {
        code += groupContent;
      }
    } else {
      code += `const [checked, setChecked] = useState(${radioConfigSelected === "opt1"});\n\n`;

      let singleRadio = `<Radio\n  name="demo"\n  value="1"\n  checked={checked}\n  onChange={(e) => setChecked(e.target.checked)}`;
      if (radioConfigLabelPos !== "none") {
        singleRadio += `\n  label="${radioConfigCustomLabel || "Pilihan Utama"}"`;
        if (radioConfigHasDesc)
          singleRadio += `\n  description="Keterangan pembantu di bawah label"`;
      } else {
        singleRadio += `\n  aria-label="${radioConfigCustomLabel || "Pilihan Utama"}"`;
      }
      singleRadio += `${sizeAttr}${variantAttr}${labelPosAttr}${disabledAttr}${invalidAttr}\n/>`;

      if (radioConfigWrapForm) {
        code += `<FormField\n  label="Persetujuan"\n  required${radioConfigInvalid ? '\n  error="Harap setujui ketentuan ini"' : ""}\n>\n`;
        code += singleRadio
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n");
        code += `\n</FormField>`;
      } else {
        code += singleRadio;
      }
    }

    return code;
  }, [
    radioConfigMode,
    radioConfigVariant,
    radioConfigSize,
    radioConfigLabelPos,
    radioConfigOrientation,
    radioConfigDisabled,
    radioConfigInvalid,
    radioConfigHasDesc,
    radioConfigWrapForm,
    radioConfigCustomLabel,
    radioConfigSelected,
  ]);

  const dynamicTooltipCode = useMemo(() => {
    let code = `import { Tooltip } from '@aposis/design-system';\n`;
    if (tooltipVariant === "default") {
      code += `import { IconHelpCircle } from '@tabler/icons-react';\n\n`;
    } else {
      code += `\n`;
    }

    code += `<Tooltip\n  text="${tooltipText}"`;
    if (tooltipPos !== "auto") {
      code += `\n  pos="${tooltipPos}"`;
    }
    if (tooltipSize !== "md") {
      code += `\n  size="${tooltipSize}"`;
    }
    if (tooltipVariant !== "default") {
      code += `\n  variant="${tooltipVariant}"`;
    }
    if (!tooltipArrow) {
      code += `\n  arrow={false}`;
    }
    code += `\n>\n`;

    if (tooltipVariant === "definition") {
      code += `  ${tooltipTriggerText}\n`;
    } else {
      code += `  <button\n    type="button"\n    className="p-2 transition-colors rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"\n  >\n    <IconHelpCircle size={20} />\n  </button>\n`;
    }

    code += `</Tooltip>`;
    return code;
  }, [
    tooltipText,
    tooltipPos,
    tooltipSize,
    tooltipVariant,
    tooltipArrow,
    tooltipTriggerText,
  ]);

  const tooltipSnippets = [
    {
      label: "Penggunaan Dasar (Icon Trigger)",
      desc: "Tooltip terhubung dengan tombol ikon bantuan (?) dengan posisi terarah.",
      code: `import { Tooltip } from '@aposis/design-system';\nimport { IconHelpCircle } from '@tabler/icons-react';\n\n<Tooltip text="Tooltip text" pos="top">\n  <button type="button" aria-label="Bantuan">\n    <IconHelpCircle size={20} />\n  </button>\n</Tooltip>`,
    },
    {
      label: "Definition Tooltip",
      desc: "Teks dengan garis bawah titik-titik (dotted underline) untuk penjelasan istilah atau definisi kata.",
      code: `import { Tooltip } from '@aposis/design-system';\n\n<p className="text-sm text-slate-600">\n  Sistem ini menerapkan standar akreditasi{' '}\n  <Tooltip text="Badan Akreditasi Nasional Sekolah/Madrasah" variant="definition">\n    BAN-S/M\n  </Tooltip>{' '}\n  secara berkala.\n</p>`,
    },
    {
      label: 'Posisi Otomatis (pos="auto")',
      desc: "Menghitung posisi ideal secara cerdas agar tidak keluar dari batas layar viewport.",
      code: `import { Tooltip } from '@aposis/design-system';\n\n<Tooltip text="Otomatis menyesuaikan posisi layar" pos="auto">\n  <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium">\n    Arahkan Kursor ke Sini\n  </button>\n</Tooltip>`,
    },
    {
      label: "Kustom Styling via className",
      desc: "Warna latar, teks, dan garis tepi dapat disesuaikan secara bebas menggunakan class Tailwind.",
      code: `import { Tooltip } from '@aposis/design-system';\n\n{/* Tooltip bertema Brand Biru */}\n<Tooltip text="Fitur Unggulan" className="bg-blue-600">\n  <span>Arahkan ke Sini</span>\n</Tooltip>\n\n{/* Tooltip bertema Terang (Light) */}\n<Tooltip text="Keterangan Ringan" className="bg-white border shadow-lg text-slate-900 border-slate-200">\n  <span>Arahkan ke Sini</span>\n</Tooltip>`,
    },
  ];

  const dynamicNotificationCode = useMemo(() => {
    const isError = notifVariant === "error" || notifVariant === "danger";
    const method = isError ? "error" : notifVariant;

    let code = `import { notification, Notification } from '@aposis/design-system';\n`;
    if (notifCustomIcon) {
      code += `import { IconBell } from '@tabler/icons-react';\n`;
    }
    code += `\n// 1. Munculkan Toast Melayang secara Programatik:\n`;
    code += `notification.${method}({\n`;
    code += `  teks: '${notifTeks.replace(/'/g, "\\'")}',\n`;
    if (notifDescription.trim()) {
      code += `  description: '${notifDescription.replace(/'/g, "\\'")}',\n`;
    }
    code += `  pos: '${notifPos}',\n`;
    code += `  duration: ${notifDuration},\n`;
    if (notifHasAction) {
      code += `  actionTrigger: {\n    label: '${notifActionLabel}',\n    onClick: () => console.log('Aksi diklik'),\n  },\n`;
    }
    if (notifCustomIcon) {
      code += `  icon: <IconBell size={20} className="text-blue-500" />,\n`;
    }
    code += `});\n\n`;
    code += `// 2. Atau pasang sebagai Banner Komponen Statis:\n`;
    code += `<Notification\n  variant="${notifVariant}"\n  teks="${notifTeks.replace(/"/g, "&quot;")}"\n`;
    if (notifDescription.trim()) {
      code += `  description="${notifDescription.replace(/"/g, "&quot;")}"\n`;
    }
    if (notifHasAction) {
      code += `  actionTrigger={{\n    label: '${notifActionLabel}',\n    onClick: () => console.log('Aksi dijalankan'),\n  }}\n`;
    }
    if (notifCustomIcon) {
      code += `  icon={<IconBell size={20} className="text-blue-500" />}\n`;
    }
    code += `  onClose={() => console.log('Ditutup')}\n/>`;
    return code;
  }, [
    notifVariant,
    notifPos,
    notifTeks,
    notifDescription,
    notifDuration,
    notifHasAction,
    notifActionLabel,
    notifCustomIcon,
  ]);

  const notificationSnippets = [
    {
      label: "Dasar (Toast Mandiri)",
      desc: "Memanggil notifikasi toast melayang secara programatis pada posisi layar yang dipilih.",
      code: `import { notification } from '@aposis/design-system';\n\n// Panggil kapan saja, misal setelah submit form atau async task:\nnotification.show({\n  teks: 'Notifikasi Berhasil',\n  description: 'Data profil guru telah tersimpan rapi.',\n  variant: 'success',\n  pos: 'top-right',\n  duration: 4000,\n});`,
    },
    {
      label: "4 Varian Semantik",
      desc: "Mendukung varian info, success, warning, dan error dengan palet resmi Aposis.",
      code: `import { notification } from '@aposis/design-system';\n\nnotification.info({ teks: 'Informasi', description: 'Ada fitur kurikulum baru.' });\nnotification.success({ teks: 'Sukses', description: 'Nilai rapor berhasil dikirim.' });\nnotification.warning({ teks: 'Peringatan', description: 'Sisa kuota upload 10%.' });\nnotification.error({ teks: 'Kesalahan', description: 'Gagal menghubungi server database.' });`,
    },
    {
      label: "Multiple Notifikasi (Stacking vs Default)",
      desc: "Mendukung gaya bertumpuk (stacking deck) atau daftar lurus vertikal (default).",
      code: `import { notification, NotificationContainer } from '@aposis/design-system';\n\n// Di root layout aplikasi:\n<NotificationContainer multiStyle="stacking" />\n\n// Panggil beberapa kali:\nnotification.info({ teks: 'Notifikasi 1', description: 'Pesan pertama' });\nnotification.success({ teks: 'Notifikasi 2', description: 'Pesan kedua' });\nnotification.warning({ teks: 'Notifikasi 3', description: 'Pesan ketiga' });`,
    },
    {
      label: "Action Trigger & Tombol Tutup",
      desc: "Menerima prop actionTrigger berupa objek { label, onClick } atau elemen kustom.",
      code: `import { notification } from '@aposis/design-system';\n\nnotification.info({\n  teks: 'Pembaruan Tersedia',\n  description: 'Versi 3.2 aplikasi siap diunduh.',\n  actionTrigger: {\n    label: 'Perbarui Sekarang',\n    onClick: () => window.location.reload(),\n  },\n  pos: 'bottom-right',\n  duration: 6000,\n});`,
    },
    {
      label: "Komponen Statis / Inline",
      desc: "Bisa langsung dipasang di dalam halaman atau panel card sebagai banner notifikasi.",
      code: `import { Notification } from '@aposis/design-system';\n\n<Notification\n  variant="warning"\n  teks="Perhatian"\n  description="Masa pengisian rapor semester ganjil berakhir 3 hari lagi."\n  actionTrigger={{ label: 'Isi Sekarang', onClick: () => alert('Isi') }}\n/>`,
    },
  ];

  const dynamicAccordionCode = useMemo(() => {
    let code = `import { Accordion } from '@aposis/design-system';\n\n`;
    code += `<Accordion\n`;
    code += `  title="${accordionTitle || "Title"}"\n`;
    if (accordionSubtitle.trim()) {
      code += `  subtitle="${accordionSubtitle}"\n`;
    }
    if (accordionSize !== "md") {
      code += `  size="${accordionSize}"\n`;
    }
    if (accordionWidth !== "full") {
      code += `  width="${accordionWidth}"\n`;
    }
    if (accordionDisabled) {
      code += `  disabled\n`;
    }
    code += `  defaultOpen\n`;
    code += `>\n`;
    code += `  <div className="text-sm text-slate-600 dark:text-slate-300">\n`;
    code += `    {/* Konten kustom di sini */}\n`;
    code += `    <p>Konten accordion yang fleksibel.</p>\n`;
    code += `  </div>\n`;
    code += `</Accordion>`;
    return code;
  }, [
    accordionTitle,
    accordionSubtitle,
    accordionSize,
    accordionWidth,
    accordionDisabled,
  ]);

  const accordionSnippets = [
    {
      label: "Dasar (Collapsible)",
      desc: "Accordion dengan judul utama dan transisi collapse/expand yang mulus.",
      code: `import { Accordion } from '@aposis/design-system';\n\n<Accordion title="Judul Utama">\n  <p>Isi konten yang dapat dilipat dan dibuka dengan mudah.</p>\n</Accordion>`,
    },
    {
      label: "Dengan Subtitle & Size",
      desc: "Mendukung prop subtitle di bawah judul dan variasi ukuran sm, md, atau lg.",
      code: `import { Accordion } from '@aposis/design-system';\n\n<Accordion\n  title="Kurikulum 2026"\n  subtitle="Rincian mata pelajaran dan kompetensi dasar"\n  size="lg"\n>\n  <p>Konten daftar kurikulum lengkap.</p>\n</Accordion>`,
    },
    {
      label: "Kontrol Lebar (Width Preset)",
      desc: "Pengaturan lebar menggunakan preset 'full', 'sm', 'md', 'lg', 'xl', atau custom class.",
      code: `import { Accordion } from '@aposis/design-system';\n\n<Accordion\n  title="Panel Pengaturan Akun"\n  width="md"\n  defaultOpen\n>\n  <p>Form pengaturan preferensi pengguna.</p>\n</Accordion>`,
    },
    {
      label: "Controlled State (isOpen & onToggle)",
      desc: "Status open dapat dikontrol secara eksternal melalui state React.",
      code: `import { useState } from 'react';\nimport { Accordion } from '@aposis/design-system';\n\nconst [isOpen, setIsOpen] = useState(false);\n\n<Accordion\n  title="Controlled Accordion"\n  isOpen={isOpen}\n  onToggle={setIsOpen}\n>\n  <p>Status: {isOpen ? 'Terbuka' : 'Tertutup'}</p>\n</Accordion>`,
    },
    {
      label: "Kustom Anak Elemen (Children)",
      desc: "Dapat memuat konten arbitrary seperti list, form, tabel, atau kartu statistik.",
      code: `import { Accordion } from '@aposis/design-system';\n\n<Accordion title="Daftar Siswa Terdaftar">\n  <div className="space-y-2">\n    <div className="p-2 rounded bg-slate-50">Siswa 1</div>\n    <div className="p-2 rounded bg-slate-50">Siswa 2</div>\n  </div>\n</Accordion>`,
    },
  ];

  const chartHeaderSnippets: SnippetItem[] = [
  {
    label: 'React',
    code: `<ChartHeader
  title="${chartHeaderTitle}"
  subtitle="${chartHeaderSubtitle}"
  activeChartType="${activeChartType}"
  onChartTypeChange={(id) => setActiveChartType(id)}
  activeTags={${JSON.stringify(activeTags)}}
  onRemoveTag={(tag) => setActiveTags(activeTags.filter(t => t !== tag))}
  onFilterClick={() => console.log('Filter clicked')}
/>`,
  },
];

  const figmaColumns: Column<FigmaMockRow>[] = useMemo(
    () => [
      { key: "col1", header: "Header", sortable: true },
      { key: "col2", header: "Header", sortable: true },
      { key: "col3", header: "Header" },
      { key: "col4", header: "Header" },
      { key: "col5", header: "Header" },
      { key: "col6", header: "Header" },
      { key: "col7", header: "Header" },
      { key: "col8", header: "Header" },
      { key: "col9", header: "Header" },
      { key: "col10", header: "He...", truncate: true },
      {
        key: "actions",
        header: "...",
        align: "center",
        render: () => (
          <Button
            size="xs"
            variant="secondary"
            className="px-2.5 py-1 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              notification.info({
                teks: "Aksi Baris",
                description: "Tombol baris aksi diklik.",
              });
            }}
          >
            Button
          </Button>
        ),
      },
    ],
    []
  );

  const dynamicDataTableCode = useMemo(() => {
    let code = `import { DataTable, type Column } from '@aposis/design-system';\n\n`;
    code += `// Definisi Kolom\nconst columns: Column<DataRecord>[] = [\n  { key: 'col1', header: 'Header', sortable: true },\n  { key: 'col2', header: 'Header', sortable: true },\n  { key: 'col3', header: 'Header' },\n  // ...\n  { key: 'actions', header: '...', render: () => <Button size="xs" variant="secondary">Button</Button> },\n];\n\n`;
    code += `<DataTable\n`;
    if (dtTitle.trim()) code += `  title="${dtTitle}"\n`;
    if (dtDescription.trim()) code += `  description="${dtDescription}"\n`;
    code += `  columns={columns}\n`;
    code += `  data={${dtIsEmpty ? "[]" : "data"}}\n`;
    code += `  keyExtractor={(item) => item.id}\n`;
    if (dtSearchable) {
      code += `  searchable\n  searchPlaceholder="Search input text"\n`;
    }
    if (dtSelectable) {
      code += `  selectable\n  selectedRowKeys={selectedKeys}\n  onSelectionChange={(keys) => setSelectedKeys(keys)}\n`;
    }
    if (dtExpandable) {
      code += `  expandable\n  expandedRowRender={(row) => (\n    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">\n      Detail informasi untuk baris #{row.id}\n    </div>\n  )}\n`;
    }
    if (dtHasToolbarActions) {
      code += `  primaryAction={{\n    label: 'Button +',\n    onClick: () => handleCreate(),\n  }}\n  showDefaultSecondaryActions\n`;
    }
    if (dtIsLoading) {
      code += `  isLoading\n`;
    }
    if (dtHasPagination) {
      code += `  pagination={{\n    currentPage: ${dtPage},\n    totalPages: 30,\n    totalItems: 150,\n    onPageChange: (p) => setPage(p),\n  }}\n`;
    }
    code += `/>`;
    return code;
  }, [
    dtTitle,
    dtDescription,
    dtSearchable,
    dtSelectable,
    dtExpandable,
    dtHasToolbarActions,
    dtHasPagination,
    dtIsLoading,
    dtIsEmpty,
    dtPage,
  ]);

  const dataTableSnippets = [
    {
      label: "Dasar (Standard Table)",
      desc: "Tabel data lengkap dengan judul, deskripsi, pencarian terintegrasi, tombol aksi toolbar, dan paginasi.",
      code: `import { DataTable, type Column } from '@aposis/design-system';\n\ninterface UserRow {\n  id: string;\n  name: string;\n  role: string;\n}\n\nconst columns: Column<UserRow>[] = [\n  { key: 'name', header: 'Nama Lengkap', sortable: true },\n  { key: 'role', header: 'Peran' },\n];\n\n<DataTable\n  title="Daftar Pengguna"\n  description="Kelola hak akses dan peran pengguna dalam sistem."\n  columns={columns}\n  data={userData}\n  keyExtractor={(item) => item.id}\n  searchable\n  primaryAction={{\n    label: 'Tambah Pengguna',\n    onClick: () => handleAdd(),\n  }}\n  pagination={{\n    currentPage: 1,\n    totalPages: 10,\n    totalItems: 100,\n    onPageChange: (page) => setPage(page),\n  }}\n/>`,
    },
    {
      label: "Baris Dapat Diekspansi (Expandable Rows)",
      desc: "Mendukung tombol chevron pada setiap baris untuk menampilkan panel detail atau sub-tabel yang fleksibel.",
      code: `import { DataTable } from '@aposis/design-system';\n\n<DataTable\n  title="Laporan Transaksi"\n  columns={columns}\n  data={data}\n  keyExtractor={(item) => item.id}\n  expandable\n  expandedRowRender={(row) => (\n    <div className="p-4 space-y-1 bg-slate-50 dark:bg-slate-800/40 rounded-xl">\n      <div className="font-semibold text-slate-800 dark:text-slate-200">\n        Rincian Transaksi #{row.id}\n      </div>\n      <div className="text-xs text-slate-500">\n        Status verifikasi berhasil dicatat ke sistem audit.\n      </div>\n    </div>\n  )}\n/>`,
    },
    {
      label: "Seleksi Baris (Selectable with Checkboxes)",
      desc: "Dilengkapi checkbox pada setiap baris dan select-all checkbox di header dengan status parsial (indeterminate).",
      code: `import { useState } from 'react';\nimport { DataTable } from '@aposis/design-system';\n\nconst [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);\n\n<DataTable\n  title="Manajemen Arsip"\n  columns={columns}\n  data={data}\n  keyExtractor={(item) => item.id}\n  selectable\n  selectedRowKeys={selectedKeys}\n  onSelectionChange={(keys, rows) => {\n    setSelectedKeys(keys);\n    console.log('Baris terpilih:', rows);\n  }}\n/>`,
    },
    {
      label: "Kombinasi Expandable & Selectable",
      desc: "Menghadirkan fungsionalitas ekspansi baris dan pemilihan multi-baris sekaligus secara harmonis.",
      code: `import { DataTable } from '@aposis/design-system';\n\n<DataTable\n  title="Data Komprehensif"\n  description="Mode kombinasi ekspansi dan seleksi."\n  columns={columns}\n  data={data}\n  keyExtractor={(item) => item.id}\n  searchable\n  selectable\n  expandable\n  expandedRowRender={(row) => (\n    <div className="p-3 text-xs text-slate-600 dark:text-slate-300">\n      Informasi pelengkap untuk record ID {row.id}\n    </div>\n  )}\n  pagination={{\n    currentPage: 1,\n    totalPages: 30,\n    onPageChange: (p) => setPage(p),\n  }}\n/>`,
    },
    {
      label: "Data Akademik Siswa",
      desc: "Penerapan nyata untuk manajemen siswa dengan komponen Avatar, Badge status, perataan kolom, dan sortable.",
      code: `import { DataTable, Avatar, Badge, type Column } from '@aposis/design-system';\n\nconst studentColumns: Column<Student>[] = [\n  {\n    key: 'name',\n    header: 'Nama Siswa',\n    render: (row) => (\n      <div className="flex items-center gap-2.5">\n        <Avatar name={row.name} size="sm" />\n        <div>\n          <div className="font-semibold text-slate-800 dark:text-slate-200">{row.name}</div>\n          <div className="text-[11px] text-slate-400">NISN: {row.nisn}</div>\n        </div>\n      </div>\n    ),\n  },\n  { key: 'class', header: 'Kelas' },\n  {\n    key: 'status',\n    header: 'Status',\n    render: (row) => <Badge variant="success" dot appearance="subtle">{row.status}</Badge>,\n  },\n  {\n    key: 'gpa',\n    header: 'IPK / Rata-rata',\n    align: 'right',\n    render: (row) => <span className="font-bold">{row.gpa.toFixed(2)}</span>,\n  },\n];\n\n<DataTable\n  title="Daftar Siswa Aktif"\n  description="Data siswa tahun ajaran 2025/2026."\n  columns={studentColumns}\n  data={students}\n  keyExtractor={(item) => item.id}\n  searchable\n  pagination={{ currentPage: 1, totalPages: 5, onPageChange: setPage }}\n/>`,
    },
  ];

  const buttonSnippets = [
    {
      label: "Dasar",
      desc: "Penggunaan dasar Button dengan variant dan size standar.",
      code: `import { Button } from '@aposis/design-system';\n\n<Button variant="primary" size="md">Simpan Perubahan</Button>`,
    },
    {
      label: "Icon di Kiri (leftIcon)",
      desc: 'Tambahkan prop leftIcon={<Icon icon={IconPlus} size="sm" />} untuk meletakkan ikon di sebelah kiri teks.',
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconPlus } from '@tabler/icons-react';\n\n<Button\n  variant="primary"\n  leftIcon={<Icon icon={IconPlus} size="sm" />}\n>\n  Tambah Data\n</Button>`,
    },
    {
      label: "Icon di Kanan (rightIcon)",
      desc: 'Tambahkan prop rightIcon={<Icon icon={IconArrowRight} size="sm" />} untuk tombol aksi atau langkah navigasi.',
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconArrowRight } from '@tabler/icons-react';\n\n<Button\n  variant="outline"\n  rightIcon={<Icon icon={IconArrowRight} size="sm" />}\n>\n  Langkah Selanjutnya\n</Button>`,
    },
    {
      label: "Icon-Only (Square)",
      desc: "Tombol khusus ikon berbentuk bujur sangkar proporsional dengan prop iconOnly.",
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconPlus } from '@tabler/icons-react';\n\n<Button\n  variant="primary"\n  size="md"\n  iconOnly\n  leftIcon={<Icon icon={IconPlus} size="sm" />}\n  aria-label="Tambah Data"\n/>`,
    },
    {
      label: "Skeleton State",
      desc: "Menampilkan placeholder animasi loading berdenyut (pulse) yang menyesuaikan ukuran button.",
      code: `import { Button } from '@aposis/design-system';\n\n// Text Button Skeleton:\n<Button size="md" skeleton />\n\n// Icon-Only Skeleton:\n<Button size="md" iconOnly skeleton />`,
    },
    {
      label: "Kedua Icon (Kiri & Kanan)",
      desc: "Menampilkan ikon di kedua sisi tombol (misal tombol unduh dengan opsi dropdown).",
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconDownload, IconChevronDown } from '@tabler/icons-react';\n\n<Button\n  variant="secondary"\n  leftIcon={<Icon icon={IconDownload} size="sm" />}\n  rightIcon={<Icon icon={IconChevronDown} size="sm" />}\n>\n  Export Dokumen\n</Button>`,
    },
    {
      label: "Cara Ganti Ikon Lain",
      desc: "Pilih nama ikon dari ribuan pilihan di Tabler Icons lalu import dan pasang ke <Icon icon={...} />.",
      code: `import { Button, Icon } from '@aposis/design-system';\n// 1. Import nama ikon dari library Tabler Icons:\nimport {\n  IconTrash,\n  IconDeviceFloppy,\n  IconSearch,\n  IconSettings,\n  IconDownload\n} from '@tabler/icons-react';\n\n// 2. Tombol Hapus (Merah + Icon Trash):\n<Button variant="danger" leftIcon={<Icon icon={IconTrash} size="sm" />}>\n  Hapus Akun\n</Button>\n\n// 3. Tombol Simpan (Hijau + Icon Disket):\n<Button variant="success" leftIcon={<Icon icon={IconDeviceFloppy} size="sm" />}>\n  Simpan Perubahan\n</Button>\n\n// 4. Tombol Cari (Outline + Icon Kaca Pembesar):\n<Button variant="outline" leftIcon={<Icon icon={IconSearch} size="sm" />}>\n  Cari Siswa\n</Button>`,
    },
    {
      label: "Kustom id & className",
      desc: "Tiap atom menerima id unik dan kustom className Tailwind untuk penyesuaian khusus.",
      code: `import { Button, Icon } from '@aposis/design-system';\nimport { IconDeviceFloppy } from '@tabler/icons-react';\n\n<Button\n  id="btn-submit-form"\n  className="w-full shadow-lg hover:shadow-xl hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-indigo-600"\n  leftIcon={<Icon icon={IconDeviceFloppy} size="sm" />}\n>\n  Simpan Data Guru\n</Button>`,
    },
  ];

  const inputSnippets = [
    {
      label: "Dasar",
      desc: "Input teks standar",
      code: `import { Input } from '@aposis/design-system';\n\n<Input placeholder="Masukkan nama..." />`,
    },
    {
      label: "Icon Kiri (leftIcon)",
      desc: "Menampilkan ikon di sisi kiri input (misal ikon pencarian)",
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconSearch } from '@tabler/icons-react';\n\n<Input\n  placeholder="Cari data siswa..."\n  leftIcon={<Icon icon={IconSearch} size="sm" />}\n/>`,
    },
    {
      label: "Icon Kanan (rightIcon)",
      desc: "Menampilkan ikon di sisi kanan input (misal indikator status atau aksi)",
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconCheck } from '@tabler/icons-react';\n\n<Input\n  placeholder="Email terverifikasi"\n  rightIcon={<Icon icon={IconCheck} size="sm" className="text-emerald-500" />}\n/>`,
    },
    {
      label: "Kedua Icon",
      desc: "Menampilkan ikon di sisi kiri dan kanan secara bersamaan",
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconUser, IconCheck } from '@tabler/icons-react';\n\n<Input\n  placeholder="Nama pengguna"\n  leftIcon={<Icon icon={IconUser} size="sm" />}\n  rightIcon={<Icon icon={IconCheck} size="sm" className="text-emerald-500" />}\n/>`,
    },
    {
      label: "Kustom id & className",
      desc: "Dapat diberikan id unik dan custom styling className Tailwind serta containerClassName",
      code: `import { Input, Icon } from '@aposis/design-system';\nimport { IconSearch } from '@tabler/icons-react';\n\n<Input\n  id="field-search-siswa"\n  className="font-mono border-blue-400 focus:ring-blue-300"\n  containerClassName="max-w-md shadow-sm"\n  leftIcon={<Icon icon={IconSearch} size="sm" />}\n/>`,
    },
  ];

  const passwordInputSnippets = [
    {
      label: "Penggunaan PasswordInput",
      code: `import { PasswordInput } from '../molecules';

    <PasswordInput placeholder="Masukkan password" />
    <FormField label="Password Anda" error="Password kurang kuat">
      <PasswordInput inputSize="md" warning="Weak password" />
    </FormField>`,
    },
  ];
  
  const iconDocSnippets = [
    {
      label: "Dasar (Tabler)",
      desc: "Menggunakan ikon dari Tabler Icons dengan stroke otomatis sesuai ukuran",
      code: `import { Icon } from '@aposis/design-system';\nimport { IconPlus, IconSearch, IconHeart } from '@tabler/icons-react';\n\n<Icon icon={IconPlus} size="md" />\n<Icon icon={IconSearch} size="sm" />`,
    },
    {
      label: "Standar Ukuran & Stroke",
      desc: "SM (16px / 1.25px stroke), MD (20px / 1.5px stroke), LG (24px / 2px stroke)",
      code: `import { Icon } from '@aposis/design-system';\nimport { IconPlus } from '@tabler/icons-react';\n\n// SM: 16px (stroke 1.25px)\n<Icon icon={IconPlus} size="sm" />\n\n// MD: 20px (stroke 1.5px)\n<Icon icon={IconPlus} size="md" />\n\n// LG: 24px (stroke 2px)\n<Icon icon={IconPlus} size="lg" />`,
    },
    {
      label: "Ikon Kustom Figma",
      desc: "Ikon SVG resmi khusus Aposis (Bahasa ID, Bahasa EN, Rumus Matematika)",
      code: `import { IconLanguageId, IconLanguageEn, IconMathSqrt } from '@aposis/design-system';\n\n<IconLanguageId size="md" />\n<IconLanguageEn size="md" />\n<IconMathSqrt size="md" />`,
    },
    {
      label: "Kustom id & className",
      desc: "Bisa diberi id unik, warna semantik, hover effect, atau animasi putar",
      code: `import { Icon } from '@aposis/design-system';\nimport { IconHeart } from '@tabler/icons-react';\n\n<Icon\n  id="favorite-icon"\n  icon={IconHeart}\n  size="lg"\n  className="transition-transform cursor-pointer text-rose-500 hover:text-rose-600 hover:scale-125"\n/>`,
    },
  ];

  const studentColumns: Column<StudentData>[] = [
    {
      key: "name",
      header: "Nama Siswa",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size="sm" />
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              {row.name}
            </div>
            <div className="text-[11px] text-slate-400">NISN: {row.nisn}</div>
          </div>
        </div>
      ),
    },
    { key: "class", header: "Kelas" },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const map = {
          active: (
            <Badge variant="success" dot appearance="subtle">
              Aktif
            </Badge>
          ),
          graduated: (
            <Badge variant="primary" appearance="subtle">
              Lulus
            </Badge>
          ),
          pending: (
            <Badge variant="warning" dot appearance="subtle">
              Menunggu
            </Badge>
          ),
        };
        return map[row.status];
      },
    },
    {
      key: "gpa",
      header: "IPK / Rata-rata",
      align: "right",
      render: (row) => (
        <span className="font-bold text-slate-800 dark:text-slate-200">
          {row.gpa.toFixed(2)}
        </span>
      ),
    },
  ];

  const sidebarNavGroups = [
    {
      title: "Tokens & Foundations",
      items: [
        {
          id: "palettes",
          label: "Primitive Palettes",
          icon: IconPalette,
          badge: "7 Palet",
        },
        {
          id: "text-semantics",
          label: "Text Semantics",
          icon: IconTypography,
          badge: "16 Warna",
        },
        {
          id: "bg-surface-semantics",
          label: "Background & Surface",
          icon: IconLayersSubtract,
        },
        { id: "layer-elevation", label: "Layer & Elevation", icon: IconShadow },
        {
          id: "icon-border-semantics",
          label: "Icon & Border",
          icon: IconBorderAll,
        },
        {
          id: "typography-scale",
          label: "Typography v3.1",
          icon: IconTypography,
          badge: "Lexend",
        },
        {
          id: "unit-scale",
          label: "Unit Scale v3.1",
          icon: IconRuler2,
          badge: "px/rem",
        },
      ],
    },
    {
      title: "Atoms",
      items: [
        { id: "button", label: "Button", icon: IconClick },
        { id: "link", label: "Link", icon: IconArrowRight },
        { id: "icon", label: "Icon (Tabler)", icon: IconSparkles },
        { id: "input", label: "Input", icon: IconForms },
        { id: "badge", label: "Badge", icon: IconIdBadge },
        { id: "avatar", label: "Avatar", icon: IconUser },
        { id: "checkbox", label: "Checkbox", icon: IconCheckbox },
        { id: "radio", label: "Radio", icon: IconCircleDot },
        { id: "spinner", label: "Spinner", icon: IconLoader },
      ],
    },
    {
      title: "Molecules",
      items: [
        { id: "form-field", label: "FormField", icon: IconForms },
        { id: "search-bar", label: "SearchBar", icon: IconSearch },
        { id: "alert", label: "Alert", icon: IconAlertCircle },
        { id: "modal", label: "Modal", icon: IconWindow },
        { id: "tabs", label: "Tabs", icon: IconComponents },
        { id: "tooltip", label: "Tooltip", icon: IconHelpCircle },
        { id: "toggle", label: "Toggle", icon: IconToggleLeft },
        { id: "breadcrumb", label: "Breadcrumb", icon: IconLayoutList },
        { id: "dropdown", label: "Dropdown", icon: IconSelector },
        { id: "overflow-menu", label: "OverflowMenu", icon: IconDotsVertical },
        { id: "progress-bar", label: "ProgressBar", icon: IconActivity },
        { id: "tag", label: "Tag", icon: IconTags },
        { id: "password-input", label: "PasswordInput", icon: IconLock },
        { id: "notification", label: "Notification", icon: IconBell },
      ],
    },
    {
      title: "Organisms",
      items: [
        { id: "accordion", label: "Accordion", icon: IconLayoutList },
        { id: "navbar", label: "Navbar", icon: IconLayout },
        { id: "sidebar", label: "Sidebar", icon: IconLayout },
        { id: "stat-card", label: "StatCard", icon: IconTrendingUp },
        { id: "data-table", label: "DataTable", icon: IconCalendar },
        { id: "card", label: "Card", icon: IconComponents },
        { id: "chart-header", label: "ChartHeader", icon: IconChartPie },
        { id: "progress-indicator", label: "ProgressIndicator", icon: IconActivity },
      ],
    },
    {
      title: "Panduan",
      items: [
        {
          id: "microservices",
          label: "Integrasi Microservices",
          icon: IconCode,
        },
      ],
    },
  ];

  const paletteCards = [
    { name: "Green Palette", key: "green", color: primitiveColors.green },
    { name: "Cyan Palette", key: "cyan", color: primitiveColors.cyan },
    { name: "Rose Palette", key: "rose", color: primitiveColors.rose },
    { name: "Amber Palette", key: "amber", color: primitiveColors.amber },
    { name: "Blue Palette", key: "blue", color: primitiveColors.blue },
    { name: "Violet Palette", key: "violet", color: primitiveColors.violet },
    { name: "Slate Palette", key: "slate", color: primitiveColors.slate },
  ];

  const semanticTextRows = [
    {
      name: "text-disabled",
      value: "Slate 100-alpha-24",
      light: "rgba(15, 23, 42, 0.24)",
      dark: "rgba(255, 255, 255, 0.24)",
    },
    { name: "text-error", value: "Rose 60", light: "#E6212A", dark: "#E6212A" },
    {
      name: "text-error-hover",
      value: "Rose 70",
      light: "#B81A22",
      dark: "#B81A22",
    },
    {
      name: "text-helper",
      value: "Slate 60",
      light: "#64748B",
      dark: "#64748B",
    },
    {
      name: "text-interactive",
      value: "Light: Blue 60 • Dark: Blue 50",
      light: "#0F62FE",
      dark: "#4589FF",
    },
    {
      name: "text-interactive-hover",
      value: "Light: Blue 70 • Dark: Blue 50",
      light: "#0043CE",
      dark: "#4589FF",
    },
    { name: "text-inverse", value: "White", light: "#FFFFFF", dark: "#FFFFFF" },
    {
      name: "text-on-color",
      value: "White",
      light: "#FFFFFF",
      dark: "#FFFFFF",
    },
    {
      name: "text-on-color-disabled",
      value: "Light: Slate 50 • Dark: Slate 60",
      light: "#94A3B8",
      dark: "#64748B",
    },
    {
      name: "text-placeholder",
      value: "Light: Slate 50 • Dark: Slate 70",
      light: "#94A3B8",
      dark: "#475569",
    },
    {
      name: "text-primary",
      value: "Light: Slate 100 • Dark: White",
      light: "#0F172A",
      dark: "#FFFFFF",
    },
    {
      name: "text-secondary",
      value: "Light: Slate 70 • Dark: Slate 30",
      light: "#475569",
      dark: "#E2E8F0",
    },
    {
      name: "text-tertiary-amber",
      value: "Light: Amber 80 • Dark: Amber 40",
      light: "#B45309",
      dark: "#FCD34D",
    },
    {
      name: "text-tertiary-cyan",
      value: "Light: Cyan 80 • Dark: Cyan 40",
      light: "#0E7490",
      dark: "#67E8F9",
    },
    {
      name: "text-tertiary-green",
      value: "Light: Green 80 • Dark: Green 40",
      light: "#15803D",
      dark: "#86EFAC",
    },
    {
      name: "text-tertiary-violet",
      value: "Light: Violet 70 • Dark: Violet 40",
      light: "#9333EA",
      dark: "#D8B4FE",
    },
  ];

  const backgroundRows = [
    {
      name: "background-default",
      desc: "Warna dasar utama (root) untuk canvas atau halaman aplikasi.",
      light: "#FFFFFF",
      dark: "#0F172A",
      val: "Light: white • Dark: Slate 100",
    },
    {
      name: "background-subtle",
      desc: "Warna latar sekunder untuk area halaman yang butuh sedikit kontras dari latar utama.",
      light: "#F8FAFC",
      dark: "#212B3C",
      val: "Light: Slate 10 • Dark: Slate 90",
    },
  ];

  const surfaceRows = [
    {
      name: "field",
      val: "Light: Slate 20 • Dark: Slate 90",
      light: "#F1F5F9",
      dark: "#212B3C",
      desc: "Latar belakang untuk elemen input (text input, password input, dsb.)",
    },
    {
      name: "field-hover",
      val: "Light: Slate 30 • Dark: Slate 80",
      light: "#E2E8F0",
      dark: "#283445",
      desc: "Latar field saat elemen input di-hover.",
    },
    {
      name: "surface-brand",
      val: "Light + Dark: Blue 60",
      light: "#0F62FE",
      dark: "#0F62FE",
      desc: "Latar kontainer utama berbasis warna brand.",
    },
    {
      name: "surface-brand-active",
      val: "Light + Dark: Blue 80",
      light: "#002D9C",
      dark: "#002D9C",
      desc: "Efek warna saat kontainer brand ditekan/diklik.",
    },
    {
      name: "surface-brand-hover",
      val: "Light + Dark: Blue 70",
      light: "#0043CE",
      dark: "#0043CE",
      desc: "Efek warna saat kontainer brand di-hover.",
    },
    {
      name: "surface-brand-subtle",
      val: "Light: Blue 10 • Dark: Blue 100",
      light: "#EDF5FF",
      dark: "#101831",
      desc: "Latar kontainer brand dengan tona muda/transparan.",
    },
    {
      name: "surface-default",
      val: "Light: white • Dark: Slate 100",
      light: "#FFFFFF",
      dark: "#0F172A",
      desc: "Latar standar untuk kontainer utama seperti card, modal, atau side panel.",
    },
    {
      name: "surface-disabled",
      val: "Light: Slate 40 • Dark: Slate 70",
      light: "#CBD5E1",
      dark: "#475569",
      desc: "Latar belakang kontainer atau elemen dalam kondisi nonaktif.",
    },
    {
      name: "surface-green-subtle",
      val: "Light: Green 10 • Dark: Green 100",
      light: "#F0FDF4",
      dark: "#052E16",
      desc: "Latar kontainer Green (success) versi tint muda.",
    },
    {
      name: "surface-rose-subtle",
      val: "Light: Rose 10 • Dark: Rose 100",
      light: "#FFEFEF",
      dark: "#43080C",
      desc: "Latar kontainer Rose (danger) versi tint muda.",
    },
    {
      name: "surface-amber-subtle",
      val: "Light: Amber 10 • Dark: Amber 90",
      light: "#FFFBEB",
      dark: "#83380B",
      desc: "Latar kontainer Amber (warning) versi tint muda.",
    },
    {
      name: "surface-slate",
      val: "Light: Slate 80 • Dark: Slate 90",
      light: "#283445",
      dark: "#212B3C",
      desc: "Latar kontainer netral berbasis warna Slate.",
    },
  ];

  const layerRows = [
    {
      name: "layer",
      val: "Light: Slate 10 • Dark: Slate 90",
      light: "#F8FAFC",
      dark: "#212B3C",
      desc: "Lapisan di atas surface (misal item baris tabel atau list item).",
    },
    {
      name: "layer-active",
      val: "Light: Slate 30 • Dark: Slate 70",
      light: "#E2E8F0",
      dark: "#475569",
      desc: "Efek warna saat elemen layer ditekan/diklik.",
    },
    {
      name: "layer-hover",
      val: "Light: Slate 20 • Dark: Slate 80",
      light: "#F1F5F9",
      dark: "#283445",
      desc: "Efek warna saat elemen layer di-hover.",
    },
    {
      name: "layer-brand-hover",
      val: "Light: Blue 60-alpha-12 • Dark: Blue 60-alpha-32",
      light: "rgba(15, 98, 254, 0.12)",
      dark: "rgba(15, 98, 254, 0.32)",
      desc: "Efek warna hover bertema brand untuk elemen layer.",
    },
    {
      name: "layer-tint",
      val: "Light: Slate 60-alpha-4 • Dark: Slate 100-alpha-24",
      light: "rgba(100, 116, 139, 0.04)",
      dark: "rgba(15, 23, 42, 0.24)",
      desc: "Lapisan bertona netral/transparan untuk menandai area di atas surface.",
    },
  ];

  const elevationRows = [
    {
      name: "elevation-high",
      val: "black-alpha-16",
      desc: "Bayangan paling tegas/dalam untuk elevasi hirarki tertinggi (misal modal dialog, drawer, floating notification).",
    },
    {
      name: "elevation-medium",
      val: "black-alpha-12",
      desc: "Bayangan sedang untuk komponen melayang (misal popover, menu) atau hover state.",
    },
    {
      name: "elevation-low",
      val: "black-alpha-8",
      desc: "Bayangan halus untuk komponen berpendar ringan (misal card rendah atau dropdown).",
    },
  ];

  const iconSemanticRows = [
    {
      name: "icon-disabled",
      val: "Slate 100-alpha-24",
      light: "rgba(15, 23, 42, 0.24)",
      dark: "rgba(255, 255, 255, 0.24)",
      desc: "Warna ikon untuk elemen dalam kondisi nonaktif.",
    },
    {
      name: "icon-helper",
      val: "Light: Slate 60 • Dark: Slate 50",
      light: "#64748B",
      dark: "#94A3B8",
      desc: "Warna ikon pembantu (misal ikon petunjuk).",
    },
    {
      name: "icon-interactive",
      val: "Light + Dark: Blue 60",
      light: "#0F62FE",
      dark: "#0F62FE",
      desc: "Warna ikon untuk elemen interaktif (misal dapat diklik/di-hover).",
    },
    {
      name: "icon-primary",
      val: "Light: Slate 100 • Dark: Slate 10",
      light: "#0F172A",
      dark: "#F8FAFC",
      desc: "Warna utama untuk ikon penting atau hirarki tertinggi.",
    },
    {
      name: "icon-secondary",
      val: "Light: Slate 70 • Dark: Slate 20",
      light: "#475569",
      dark: "#F1F5F9",
      desc: "Warna sekunder untuk ikon pendukung dengan tingkat kontras lebih rendah.",
    },
    {
      name: "icon-tertiary-green",
      val: "Light: Green 80 • Dark: Green 50",
      light: "#15803D",
      dark: "#4ADE80",
      desc: "Warna ikon hijau untuk indikasi sukses/positif.",
    },
    {
      name: "icon-tertiary-rose",
      val: "Light: Rose 60 • Dark: Rose 50",
      light: "#E6212A",
      dark: "#FF3941",
      desc: "Warna ikon merah/rose untuk indikasi bahaya/eror.",
    },
  ];

  const borderSemanticRows = [
    {
      name: "border-alert",
      val: "Amber 60",
      light: "#F59E0B",
      dark: "#F59E0B",
      desc: "Garis tepi bertema Amber untuk status peringatan (warning/alert).",
    },
    {
      name: "border-card",
      val: "Light: Slate 40 • Dark: Slate 70",
      light: "#CBD5E1",
      dark: "#475569",
      desc: "Garis tepi khusus untuk kontainer berbentuk card.",
    },
    {
      name: "border-card-hover",
      val: "Blue 60",
      light: "#0F62FE",
      dark: "#0F62FE",
      desc: "Efek warna garis tepi card saat dalam kondisi di-hover.",
    },
    {
      name: "border-danger",
      val: "Rose 50",
      light: "#FF3941",
      dark: "#FF3941",
      desc: "Garis tepi bertema Rose untuk status bahaya atau eror (danger/error).",
    },
    {
      name: "border-disabled",
      val: "Light: Slate 30 • Dark: Slate 70",
      light: "#E2E8F0",
      dark: "#475569",
      desc: "Garis tepi untuk komponen dalam kondisi nonaktif (disabled).",
    },
    {
      name: "border-subtle-01",
      val: "Light: Slate 20 • Dark: Slate 90",
      light: "#F1F5F9",
      dark: "#212B3C",
      desc: "Garis tepi sangat tipis untuk pemisah antar elemen ringan.",
    },
    {
      name: "border-success",
      val: "Green 70",
      light: "#16A34A",
      dark: "#16A34A",
      desc: "Garis tepi bertema Green untuk status berhasil/sukses.",
    },
  ];

  interface SnippetItem {
    label?: string;
    code: string;
    desc?: string;
    language?: string;
    filename?: string;
  }

  // Helper component to render component documentation card with multiple snippet tabs
  const DocCard = ({
    title,
    badgeText = "Atom",
    description,
    usageSnippet,
    snippets,
    tips,
    children,
  }: {
    title: string;
    badgeText?: string;
    description: string;
    usageSnippet?: string;
    snippets?: SnippetItem[];
    tips?: React.ReactNode;
    children: React.ReactNode;
  }) => {
    const allSnippets: SnippetItem[] =
      snippets && snippets.length > 0
        ? snippets
        : usageSnippet
          ? [{ label: "Kode TSX", code: usageSnippet }]
          : [];
    const [activeIdx, setActiveIdx] = useState(0);
    const activeItem = allSnippets[activeIdx] || allSnippets[0];

    return (
      <div className="space-y-6 duration-150 animate-in fade-in">
        <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="primary" appearance="solid" size="sm">
              {badgeText}
            </Badge>
            <span className="font-mono text-xs text-slate-400">
              @aposis/design-system
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="max-w-3xl mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {description}
          </p>

          {/* Tips / Guidance banner */}
          {tips && <div className="mt-4">{tips}</div>}

          {/* Multi-Tab Code Snippet Box */}
          {allSnippets.length > 0 && (
            <div className="mt-4 overflow-hidden border shadow-sm rounded-xl bg-slate-900 border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-slate-800 bg-slate-950/70">
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  <Icon
                    icon={IconCode}
                    size="sm"
                    className="ml-1 mr-1 text-aposis-blue-50 shrink-0"
                  />
                  {allSnippets.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeIdx === idx
                          ? "bg-aposis-blue-60 text-white shadow-xs"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {s.label || s.filename || `Snippet ${idx + 1}`}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => copySnippet(activeItem?.code || "")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-sans font-medium active:scale-95 shrink-0"
                  title="Salin kode ini"
                >
                  {copiedCode ? (
                    <Icon
                      icon={IconCheck}
                      size="sm"
                      className="text-emerald-400"
                    />
                  ) : (
                    <Icon icon={IconCopy} size="sm" />
                  )}
                  <span>{copiedCode ? "Tersalin!" : "Salin Kode"}</span>
                </button>
              </div>
              {activeItem?.desc && (
                <div className="flex items-center gap-2 px-4 py-2 text-xs border-b bg-slate-950/50 text-slate-300 border-slate-800">
                  <span className="font-semibold text-aposis-blue-40 shrink-0">
                    💡 Cara Pakai:
                  </span>
                  <span>{activeItem.desc}</span>
                </div>
              )}
              <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre select-all text-sky-300">
                <code>{activeItem?.code}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="pt-2">{children}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen font-sans transition-colors duration-200 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <NotificationContainer multiStyle={notifMultiStyle} />
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b shadow-xs bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200/80 dark:border-slate-800 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? (
              <Icon icon={IconX} size="md" />
            ) : (
              <Icon icon={IconMenu2} size="md" />
            )}
          </button>
          <div className="flex items-center justify-center w-8 h-8 text-sm font-black text-white shadow-sm rounded-xl bg-gradient-to-tr from-aposis-blue-60 to-aposis-cyan-50">
            v3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 dark:text-white">
                Aposis Design System
              </span>
              <Badge variant="primary" appearance="subtle" size="sm">
                v3.1
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Dokumentasi & Katalog Komponen Resmi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            {isDarkMode ? (
              <Icon icon={IconSun} size="sm" className="text-amber-400" />
            ) : (
              <Icon icon={IconMoon} size="sm" />
            )}
            <span className="hidden sm:inline">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="relative flex flex-1 w-full min-h-0">
        {/* Mobile Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 transition-opacity bg-slate-950/60 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar Navigation - Mentok Kiri */}
        <aside
          className={`fixed md:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto z-40 transition-transform duration-200 ${
            isMobileMenuOpen
              ? "translate-x-0 shadow-2xl"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            {sidebarNavGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.title}
                </div>
                {group.items.map((item) => {
                  const IconComp = item.icon;
                  const isActive = selectedId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-aposis-blue-60 text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          icon={IconComp}
                          size="sm"
                          className={isActive ? "text-white" : "text-slate-400"}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main
          ref={mainRef}
          className="flex-1 min-w-0 p-6 overflow-y-auto sm:p-10"
        >
          <div className="max-w-5xl mx-auto space-y-6">
            {/* 1. BUTTON ATOM */}
            {selectedId === "button" && (
              <DocCard
                title="Button"
                badgeText="Atom"
                description="Komponen tombol aksi resmi Aposis dengan berbagai pilihan varian, ukuran, status loading/disabled, dukungan penempatan ikon (kiri/kanan), serta atribut kustom id & className."
                snippets={buttonSnippets}
                tips={
                  <div className="p-4 space-y-2 text-xs text-blue-900 border border-blue-200 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 dark:border-blue-900/60 dark:text-blue-200">
                    <div className="font-bold flex items-center gap-1.5 text-sm text-aposis-blue-70 dark:text-aposis-blue-40">
                      <Icon icon={IconInfoCircle} size="sm" />
                      Panduan Lengkap: Mengganti Ikon, Posisi Kiri/Kanan &
                      Kustomisasi
                    </div>
                    <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
                      <div className="p-3 border border-blue-100 rounded-lg bg-white/80 dark:bg-slate-900/60 dark:border-blue-900/40">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          1. Posisi Ikon (Kiri / Kanan)
                        </div>
                        <div className="mt-1 text-slate-500 dark:text-slate-400">
                          Gunakan prop{" "}
                          <code className="font-semibold text-aposis-blue-60">
                            leftIcon
                          </code>{" "}
                          atau{" "}
                          <code className="font-semibold text-aposis-blue-60">
                            rightIcon
                          </code>
                          . Anda bisa menyisipkan ikon di sisi kiri, kanan, atau
                          keduanya sekaligus.
                        </div>
                      </div>
                      <div className="p-3 border border-blue-100 rounded-lg bg-white/80 dark:bg-slate-900/60 dark:border-blue-900/40">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          2. Cara Mengganti Ikon
                        </div>
                        <div className="mt-1 text-slate-500 dark:text-slate-400">
                          Import ikon apa pun dari{" "}
                          <code className="font-semibold text-aposis-blue-60">
                            @tabler/icons-react
                          </code>{" "}
                          (ribuan ikon tersedia) lalu bungkus ke dalam{" "}
                          <code className="font-semibold text-aposis-blue-60">
                            &lt;Icon icon=&#123;IconNama&#125; size="sm" /&gt;
                          </code>
                          .
                        </div>
                      </div>
                      <div className="p-3 border border-blue-100 rounded-lg bg-white/80 dark:bg-slate-900/60 dark:border-blue-900/40">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          3. Editable: id & className
                        </div>
                        <div className="mt-1 text-slate-500 dark:text-slate-400">
                          Semua atom menerima prop standar seperti{" "}
                          <code className="font-semibold text-aposis-blue-60">
                            id="custom-id"
                          </code>{" "}
                          dan tambahan{" "}
                          <code className="font-semibold text-aposis-blue-60">
                            className="..."
                          </code>{" "}
                          tanpa merusak style bawaan.
                        </div>
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="space-y-8">
                  {/* Figma Button v3.1 Official Header Card */}
                  <div className="flex flex-col justify-between gap-6 p-6 bg-white border shadow-xs rounded-2xl dark:bg-slate-900 border-slate-200 dark:border-slate-800 md:flex-row md:items-start">
                    <div className="space-y-3">
                      <div className="text-xs font-bold tracking-wider text-aposis-blue-60 uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-aposis-blue-60" />
                        APOSIS Design System
                      </div>
                      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Button v3.1
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          PROPERTIES
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-aposis-blue-70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          VARIANTS
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          v3.1 SPEC
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 min-w-[240px]">
                      <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                        About
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Button Variations
                      </div>
                      <div className="font-semibold text-aposis-blue-60">
                        Over 200+ Variations
                      </div>
                      <ul className="text-slate-600 dark:text-slate-400 space-y-1 pt-1 text-[11px]">
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-aposis-blue-60 shrink-0" />
                          Blue Mode (Primary Brand)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                          Dark Mode (Secondary Slate)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                          Red Mode (Danger Solid &amp; Outline)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          Outline, Subtle &amp; Ghost
                        </li>
                        <li className="flex items-center gap-1.5 text-slate-500">
                          <span>
                            • 4 Ukuran: LG (48), MD (40), SM (32), XS (28)
                          </span>
                        </li>
                        <li className="flex items-center gap-1.5 text-slate-500">
                          <span>
                            • 6 Status: Default, Hover, Active, Focus, Disabled,
                            Skeleton
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 1. Full Figma v3.1 Spec Matrix */}
                  <ButtonV31SpecMatrix />

                  {/* 2. Interactive Live Button Builder */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-200/80 dark:border-blue-900/60">
                    <CardHeader className="border-b bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/80 border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Icon
                              icon={IconAdjustmentsHorizontal}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive Button Builder (Coba Ganti Ikon, id
                            &amp; className)
                          </CardTitle>
                          <CardDescription>
                            Ubah konfigurasi di bawah untuk melihat hasil tombol
                            secara langsung dan salin kode TSX yang ter-generate
                            otomatis!
                          </CardDescription>
                        </div>
                        <Badge variant="primary" appearance="solid" size="sm">
                          Live Tester
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Controls Grid */}
                      <div className="grid grid-cols-1 gap-5 text-xs md:grid-cols-2">
                        {/* Left column: Variant, Size, Text, State toggles */}
                        <div className="space-y-4">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              1. Pilih Varian Tombol (Figma v3.1):
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {(
                                [
                                  "primary",
                                  "secondary",
                                  "outline",
                                  "ghost",
                                  "subtle",
                                  "danger",
                                  "danger-outline",
                                  "danger-subtle",
                                  "success",
                                ] as const
                              ).map((v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => setDemoVariant(v)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                                    demoVariant === v
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              2. Pilih Ukuran (Size):
                            </label>
                            <div className="flex gap-2">
                              {(["xs", "sm", "md", "lg"] as const).map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setDemoSize(s)}
                                  className={`px-3 py-1 rounded-lg uppercase font-medium transition-all ${
                                    demoSize === s
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          {!demoIsIconOnly && (
                            <div>
                              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                                3. Teks Tombol:
                              </label>
                              <input
                                type="text"
                                value={demoButtonText}
                                onChange={(e) =>
                                  setDemoButtonText(e.target.value)
                                }
                                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-aposis-blue-50"
                                placeholder="Teks tombol..."
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2 p-3 pt-1 border bg-slate-50 dark:bg-slate-800/40 rounded-xl border-slate-200 dark:border-slate-700">
                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={demoIsIconOnly}
                                onChange={(e) =>
                                  setDemoIsIconOnly(e.target.checked)
                                }
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="font-semibold text-slate-700 dark:text-slate-300">
                                Icon Only (Square)
                              </span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={demoIsSkeleton}
                                onChange={(e) =>
                                  setDemoIsSkeleton(e.target.checked)
                                }
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="font-semibold text-slate-700 dark:text-slate-300">
                                Skeleton State
                              </span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={demoIsLoading}
                                onChange={(e) =>
                                  setDemoIsLoading(e.target.checked)
                                }
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="text-slate-700 dark:text-slate-300">
                                Status Loading
                              </span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={demoIsDisabled}
                                onChange={(e) =>
                                  setDemoIsDisabled(e.target.checked)
                                }
                                className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="text-slate-700 dark:text-slate-300">
                                Status Disabled
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Right column: Icon Kiri, Icon Kanan, ID & className */}
                        <div className="space-y-4">
                          {/* Icon Kiri Toggle & Selector */}
                          <div className="p-3 space-y-2 border rounded-xl bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={demoHasLeftIcon}
                                  onChange={(e) =>
                                    setDemoHasLeftIcon(e.target.checked)
                                  }
                                  className="rounded text-aposis-blue-60"
                                />
                                <span>
                                  {demoIsIconOnly
                                    ? "Ikon Tombol (iconOnly)"
                                    : "Aktifkan Icon Kiri (leftIcon)"}
                                </span>
                              </label>
                              <Badge
                                variant={
                                  demoHasLeftIcon ? "success" : "neutral"
                                }
                                appearance="subtle"
                                size="sm"
                              >
                                {demoHasLeftIcon ? "Aktif" : "Nonaktif"}
                              </Badge>
                            </div>
                            {demoHasLeftIcon && (
                              <div>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                                  Pilih Ikon dari Tabler:
                                </span>
                                <select
                                  value={demoLeftIconName}
                                  onChange={(e) =>
                                    setDemoLeftIconName(e.target.value)
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                                >
                                  <option value="IconPlus">
                                    IconPlus (Tambah Data)
                                  </option>
                                  <option value="IconDeviceFloppy">
                                    IconDeviceFloppy (Simpan)
                                  </option>
                                  <option value="IconSearch">
                                    IconSearch (Cari)
                                  </option>
                                  <option value="IconDownload">
                                    IconDownload (Unduh)
                                  </option>
                                  <option value="IconEdit">
                                    IconEdit (Ubah)
                                  </option>
                                  <option value="IconHeart">
                                    IconHeart (Suka)
                                  </option>
                                  <option value="IconTrash">
                                    IconTrash (Hapus)
                                  </option>
                                  <option value="IconSettings">
                                    IconSettings (Pengaturan)
                                  </option>
                                </select>
                              </div>
                            )}
                          </div>

                          {/* Icon Kanan Toggle & Selector (Hanya bila bukan iconOnly) */}
                          {!demoIsIconOnly && (
                            <div className="p-3 space-y-2 border rounded-xl bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                              <div className="flex items-center justify-between">
                                <label className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={demoHasRightIcon}
                                    onChange={(e) =>
                                      setDemoHasRightIcon(e.target.checked)
                                    }
                                    className="rounded text-aposis-blue-60"
                                  />
                                  <span>Aktifkan Icon Kanan (rightIcon)</span>
                                </label>
                                <Badge
                                  variant={
                                    demoHasRightIcon ? "success" : "neutral"
                                  }
                                  appearance="subtle"
                                  size="sm"
                                >
                                  {demoHasRightIcon ? "Aktif" : "Nonaktif"}
                                </Badge>
                              </div>
                              {demoHasRightIcon && (
                                <div>
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                                    Pilih Ikon Kanan dari Tabler:
                                  </span>
                                  <select
                                    value={demoRightIconName}
                                    onChange={(e) =>
                                      setDemoRightIconName(e.target.value)
                                    }
                                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                                  >
                                    <option value="IconArrowRight">
                                      IconArrowRight (Lanjut)
                                    </option>
                                    <option value="IconSend">
                                      IconSend (Kirim)
                                    </option>
                                    <option value="IconTrash">
                                      IconTrash (Hapus)
                                    </option>
                                    <option value="IconChevronDown">
                                      IconChevronDown (Dropdown)
                                    </option>
                                    <option value="IconSettings">
                                      IconSettings (Pengaturan)
                                    </option>
                                  </select>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Custom ID & className inputs */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                                Kustom id:
                              </label>
                              <input
                                type="text"
                                value={demoCustomId}
                                onChange={(e) =>
                                  setDemoCustomId(e.target.value)
                                }
                                placeholder="misal: btn-submit"
                                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                                Kustom className:
                              </label>
                              <input
                                type="text"
                                value={demoCustomClass}
                                onChange={(e) =>
                                  setDemoCustomClass(e.target.value)
                                }
                                placeholder="misal: shadow-lg"
                                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Live Preview Area */}
                      <div className="flex flex-col items-center justify-center gap-3 p-5 border rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Hasil Render Tombol (Live Component):
                        </span>
                        <div className="py-2">
                          <Button
                            id={demoCustomId || undefined}
                            variant={demoVariant}
                            size={demoSize}
                            iconOnly={demoIsIconOnly}
                            skeleton={demoIsSkeleton}
                            isLoading={demoIsLoading}
                            disabled={demoIsDisabled}
                            className={demoCustomClass || undefined}
                            leftIcon={
                              demoHasLeftIcon && demoIcons[demoLeftIconName] ? (
                                <Icon
                                  icon={demoIcons[demoLeftIconName].icon}
                                  size={
                                    demoSize === "lg"
                                      ? "md"
                                      : demoSize === "xs"
                                        ? "xs"
                                        : "sm"
                                  }
                                />
                              ) : undefined
                            }
                            rightIcon={
                              demoHasRightIcon &&
                              !demoIsIconOnly &&
                              demoIcons[demoRightIconName] ? (
                                <Icon
                                  icon={demoIcons[demoRightIconName].icon}
                                  size={
                                    demoSize === "lg"
                                      ? "md"
                                      : demoSize === "xs"
                                        ? "xs"
                                        : "sm"
                                  }
                                />
                              ) : undefined
                            }
                            onClick={() =>
                              alert(
                                `Tombol diklik! id: "${demoCustomId}", variant: "${demoVariant}"`,
                              )
                            }
                            aria-label={
                              demoIsIconOnly ? "Tombol Aksi" : undefined
                            }
                          >
                            {!demoIsIconOnly && demoButtonText}
                          </Button>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                          Coba klik tombol di atas! Atribut{" "}
                          <code className="font-mono text-aposis-blue-60">
                            id="{demoCustomId}"
                          </code>{" "}
                          dan{" "}
                          <code className="font-mono text-aposis-blue-60">
                            className="{demoCustomClass || "default"}"
                          </code>{" "}
                          aktif diaplikasikan.
                        </div>
                      </div>

                      {/* Live Generated TSX Code */}
                      <div className="overflow-hidden border shadow-xs rounded-xl bg-slate-950 border-slate-800">
                        <div className="flex items-center justify-between px-4 py-2 font-mono text-xs border-b border-slate-800 bg-slate-900/90 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Icon
                              icon={IconCode}
                              size="sm"
                              className="text-aposis-blue-40"
                            />
                            Kode TSX:
                          </span>
                          <button
                            type="button"
                            onClick={() => copySnippet(dynamicButtonCode)}
                            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
                          >
                            {copiedCode ? (
                              <Icon
                                icon={IconCheck}
                                size="sm"
                                className="text-emerald-400"
                              />
                            ) : (
                              <Icon icon={IconCopy} size="sm" />
                            )}
                            <span>
                              {copiedCode ? "Tersalin!" : "Salin Kode"}
                            </span>
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre select-all text-sky-300">
                          <code>{dynamicButtonCode}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Real-World Combinations */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>
                        Koleksi Contoh Ikon Kiri & Kanan Populer (Siap Pakai)
                      </CardTitle>
                      <CardDescription>
                        Berbagai skenario umum penempatan ikon dan aksi tombol
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Aksi Tambah (Icon Kiri)
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<Icon icon={IconPlus} size="sm" />}
                          >
                            Tambah Data Siswa
                          </Button>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Aksi Simpan (Icon Kiri)
                          </div>
                          <Button
                            variant="success"
                            size="sm"
                            leftIcon={
                              <Icon icon={IconDeviceFloppy} size="sm" />
                            }
                          >
                            Simpan Perubahan
                          </Button>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Aksi Lanjut (Icon Kanan)
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            rightIcon={<Icon icon={IconArrowRight} size="sm" />}
                          >
                            Langkah Berikutnya
                          </Button>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Aksi Kirim (Icon Kanan)
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            rightIcon={<Icon icon={IconSend} size="sm" />}
                          >
                            Kirim Pengumuman
                          </Button>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Kedua Sisi (Unduh + Dropdown)
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<Icon icon={IconDownload} size="sm" />}
                            rightIcon={
                              <Icon icon={IconChevronDown} size="sm" />
                            }
                          >
                            Export Format CSV
                          </Button>
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Aksi Hapus (Danger + Icon)
                          </div>
                          <Button
                            variant="danger"
                            size="sm"
                            leftIcon={<Icon icon={IconTrash} size="sm" />}
                          >
                            Hapus Catatan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Varian Tombol Figma v3.1 */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Varian Tombol Resmi (Figma v3.1)</CardTitle>
                      <CardDescription>
                        Pilihan tema visual lengkap sesuai hierarki tindakan dan
                        peruntukan antarmuka
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="subtle">Subtle</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="danger-outline">Danger Outline</Button>
                        <Button variant="danger-subtle">Danger Subtle</Button>
                        <Button variant="success">Success</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ukuran Tombol & Icon-Only */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>
                        4 Ukuran Tombol (LG, MD, SM, XS) &amp; Icon-Only
                      </CardTitle>
                      <CardDescription>
                        Tersedia dalam 4 ukuran standar proporsional dengan
                        dukungan tombol bujur sangkar (iconOnly)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          size="lg"
                          leftIcon={<Icon icon={IconPlus} size="sm" />}
                        >
                          Large (48px)
                        </Button>
                        <Button
                          size="md"
                          leftIcon={<Icon icon={IconPlus} size="sm" />}
                        >
                          Medium (40px)
                        </Button>
                        <Button
                          size="sm"
                          leftIcon={<Icon icon={IconPlus} size="xs" />}
                        >
                          Small (32px)
                        </Button>
                        <Button
                          size="xs"
                          leftIcon={<Icon icon={IconPlus} size="xs" />}
                        >
                          Extra Small (28px)
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-semibold text-slate-500">
                          Icon Only:
                        </span>
                        <Button
                          size="lg"
                          iconOnly
                          leftIcon={<Icon icon={IconPlus} size="sm" />}
                          aria-label="Large Icon"
                        />
                        <Button
                          size="md"
                          iconOnly
                          leftIcon={<Icon icon={IconPlus} size="sm" />}
                          aria-label="Medium Icon"
                        />
                        <Button
                          size="sm"
                          iconOnly
                          leftIcon={<Icon icon={IconPlus} size="xs" />}
                          aria-label="Small Icon"
                        />
                        <Button
                          size="xs"
                          iconOnly
                          leftIcon={<Icon icon={IconPlus} size="xs" />}
                          aria-label="Extra Small Icon"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status, Loading & Skeleton */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>
                        Status Interaksi, Loading &amp; Skeleton
                      </CardTitle>
                      <CardDescription>
                        Indikator proses latar belakang, status nonaktif, dan
                        skeleton loading pulse
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button isLoading>Sedang Memproses...</Button>
                        <Button disabled>Disabled Button</Button>
                        <Button variant="outline" disabled>
                          Outline Disabled
                        </Button>
                        <Button skeleton size="md">
                          Placeholder
                        </Button>
                        <Button skeleton size="md" iconOnly />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* LINK ATOM */}
            {selectedId === "link" && (
              <DocCard
                title="Link"
                badgeText="Atom"
                description="Komponen tautan navigasi resmi Aposis v3 dengan warna biru resmi, dukungan panah arah (kiri/kanan/none), 3 variasi ukuran, gaya garis bawah (default/underlined), serta status disabled."
                snippets={[
                  {
                    label: "Penggunaan Dasar & Arah Panah",
                    desc: "Tautan standar berwarna biru Aposis dengan opsi panah kanan, kiri, atau tanpa panah.",
                    code: `import { Link } from '@aposis/design-system';\n\n<Link to="/dashboard" arrow="right">Lihat Dashboard</Link>\n<Link to="/kembali" arrow="left">Kembali</Link>\n<Link to="#">Tautan Standar</Link>`,
                  },
                  {
                    label: "Underlined vs Default",
                    desc: 'Gunakan variant="underlined" untuk tautan yang selalu memiliki garis bawah.',
                    code: `import { Link } from '@aposis/design-system';\n\n<Link to="#" variant="default">Underline saat hover</Link>\n<Link to="#" variant="underlined">Selalu bergaris bawah</Link>`,
                  },
                ]}
              >
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Varian Tautan Resmi (Default Biru)</CardTitle>
                      <CardDescription>
                        Komponen tautan resmi Aposis dengan warna bawaan biru,
                        dukungan arah panah, garis bawah, serta status disabled.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 overflow-x-auto border bg-slate-50 dark:bg-slate-900/50 rounded-xl border-slate-200 dark:border-slate-800">
                        <table className="w-full min-w-[640px] text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              <th className="pb-3 pr-4">Tipe Tautan</th>
                              <th className="px-4 pb-3">Panah Kanan</th>
                              <th className="px-4 pb-3">Panah Kiri</th>
                              <th className="px-4 pb-3">Tanpa Panah</th>
                              <th className="px-4 pb-3">Underlined</th>
                              <th className="pb-3 pl-4">Disabled</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            <tr>
                              <td className="py-3.5 pr-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Default (Biru Resmi)
                              </td>
                              <td className="py-3.5 px-4">
                                <Link to="#" arrow="right">
                                  Lihat Detail
                                </Link>
                              </td>
                              <td className="py-3.5 px-4">
                                <Link to="#" arrow="left">
                                  Kembali
                                </Link>
                              </td>
                              <td className="py-3.5 px-4">
                                <Link to="#">Tautan</Link>
                              </td>
                              <td className="py-3.5 px-4">
                                <Link to="#" variant="underlined">
                                  Tautan
                                </Link>
                              </td>
                              <td className="py-3.5 pl-4">
                                <Link to="#" disabled arrow="right">
                                  Tautan
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Skala Ukuran */}
                      <div className="p-4 space-y-3 border bg-slate-50 dark:bg-slate-900/50 rounded-xl border-slate-200 dark:border-slate-800">
                        <div className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                          Perbandingan Ukuran (sm, md, lg)
                        </div>
                        <div className="flex flex-wrap items-center gap-8">
                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-400 block font-mono">
                              size="lg" (16px)
                            </span>
                            <Link to="#" size="lg" arrow="right">
                              Link Action Large
                            </Link>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-400 block font-mono">
                              size="md" (14px - Default)
                            </span>
                            <Link to="#" size="md" arrow="right">
                              Link Action Medium
                            </Link>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-400 block font-mono">
                              size="sm" (12px)
                            </span>
                            <Link to="#" size="sm" arrow="right">
                              Link Action Small
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* 2. ICON ATOM */}
            {selectedId === "icon" && (
              <DocCard
                title="Icon (Tabler & Custom)"
                badgeText="Atom"
                description="Standar komponen ikon Aposis berbasis Tabler Icons dengan ketebalan garis (stroke width) proporsional resmi: SM (16px / 1.25px), MD (20px / 1.5px), LG (24px / 2px), serta ikon khusus Figma."
                snippets={iconDocSnippets}
              >
                <div className="space-y-6">
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Standar Ukuran & Stroke Width</CardTitle>
                      <CardDescription>
                        Ketebalan garis secara otomatis menyesuaikan ukuran ikon
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-center w-10 h-10 bg-white border rounded-xl dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-aposis-blue-60">
                            <Icon icon={IconPlus} size="sm" />
                          </div>
                          <div>
                            <div className="text-sm font-bold">SM: 16px</div>
                            <div className="text-xs text-slate-400">
                              Stroke: 1.25px
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-center w-10 h-10 bg-white border rounded-xl dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-aposis-blue-60">
                            <Icon icon={IconPlus} size="md" />
                          </div>
                          <div>
                            <div className="text-sm font-bold">MD: 20px</div>
                            <div className="text-xs text-slate-400">
                              Stroke: 1.5px
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-center w-10 h-10 bg-white border rounded-xl dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-aposis-blue-60">
                            <Icon icon={IconPlus} size="lg" />
                          </div>
                          <div>
                            <div className="text-sm font-bold">LG: 24px</div>
                            <div className="text-xs text-slate-400">
                              Stroke: 2px
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Ikon Kustom Figma</CardTitle>
                      <CardDescription>
                        Komponen kustom bahasa dan rumus matematika
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-6 p-4 border border-purple-300 border-dashed rounded-xl dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white border rounded-lg dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <IconLanguageId size="md" />
                          </div>
                          <span className="text-xs font-semibold">
                            Language ID
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white border rounded-lg dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <IconLanguageEn size="md" />
                          </div>
                          <span className="text-xs font-semibold">
                            Language EN
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white border rounded-lg dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <IconMathSqrt size="md" />
                          </div>
                          <span className="text-xs font-semibold">Math √x</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* 3. INPUT ATOM */}
            {selectedId === "input" && (
              <DocCard
                title="Input"
                badgeText="Atom"
                description="Elemen masukan teks dengan status fokus elegan, error highlight, dan slot ikon di sisi kiri atau kanan."
                snippets={inputSnippets}
                tips={
                  <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
                    <div className="font-semibold mb-1 flex items-center gap-1.5">
                      <Icon icon={IconInfoCircle} size="sm" />
                      Penempatan Ikon & Kustomisasi Input:
                    </div>
                    Gunakan prop{" "}
                    <code className="font-semibold text-aposis-blue-60">
                      leftIcon
                    </code>{" "}
                    atau{" "}
                    <code className="font-semibold text-aposis-blue-60">
                      rightIcon
                    </code>{" "}
                    untuk menyisipkan ikon. Anda juga dapat memberikan atribut{" "}
                    <code className="font-semibold text-aposis-blue-60">
                      id="input-id"
                    </code>
                    ,{" "}
                    <code className="font-semibold text-aposis-blue-60">
                      className="..."
                    </code>
                    , dan{" "}
                    <code className="font-semibold text-aposis-blue-60">
                      containerClassName="..."
                    </code>
                    .
                  </div>
                }
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                        1. Input Normal (Kustom id & className)
                      </label>
                      <Input
                        id="input-nama-lengkap"
                        placeholder="Masukkan nama lengkap..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="font-sans dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        id="input-nama-lengkap"
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                        2. Input dengan Icon Kiri (leftIcon)
                      </label>
                      <Input
                        id="input-search-siswa"
                        placeholder="Cari siswa berdasarkan NISN atau nama..."
                        leftIcon={<Icon icon={IconSearch} size="sm" />}
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                        3. Input dengan Icon Kanan (rightIcon)
                      </label>
                      <Input
                        id="input-email-status"
                        defaultValue="ahmad.fauzi@aposis.sch.id"
                        rightIcon={
                          <Icon
                            icon={IconCheck}
                            size="sm"
                            className="text-emerald-500"
                          />
                        }
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                        4. Input dengan Kedua Icon (Kiri & Kanan)
                      </label>
                      <Input
                        id="input-user-verified"
                        placeholder="Username sistem..."
                        defaultValue="ahmad_fauzi"
                        leftIcon={<Icon icon={IconUser} size="sm" />}
                        rightIcon={
                          <Icon
                            icon={IconCheck}
                            size="sm"
                            className="text-emerald-500"
                          />
                        }
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                        5. Input dengan Status Error
                      </label>
                      <Input
                        id="input-email-error"
                        placeholder="email@domain.com"
                        defaultValue="email-salah-format"
                        error="Format alamat email tidak valid"
                        leftIcon={
                          <Icon
                            icon={IconAlertCircle}
                            size="sm"
                            className="text-rose-500"
                          />
                        }
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* 4. BADGE ATOM */}
            {selectedId === "badge" && (
              <DocCard
                title="Badge"
                badgeText="Atom"
                description="Pill label status untuk menandai kondisi data aktif, menunggu, selesai, atau kategori."
                usageSnippet={`import { Badge } from '@aposis/design-system';\n\n<Badge variant="success" dot>Aktif</Badge>`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex flex-wrap gap-2.5">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success" dot>
                        Success
                      </Badge>
                      <Badge variant="warning" dot>
                        Warning
                      </Badge>
                      <Badge variant="danger" dot>
                        Danger
                      </Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="neutral">Neutral</Badge>
                      <Badge variant="primary" appearance="solid">
                        Solid
                      </Badge>
                      <Badge variant="success" appearance="outline">
                        Outline
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* 5. AVATAR ATOM */}
            {selectedId === "avatar" && (
              <DocCard
                title="Avatar"
                badgeText="Atom"
                description="Komponen foto profil pengguna dengan inisial nama otomatis dan indikator status online/busy/away/offline."
                usageSnippet={`import { Avatar } from '@aposis/design-system';\n\n<Avatar name="Ahmad Fauzi" size="md" status="online" />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar name="Ahmad Fauzi" size="xs" status="online" />
                      <Avatar name="Budi Santoso" size="sm" status="away" />
                      <Avatar name="Citra Kirana" size="md" status="busy" />
                      <Avatar name="Dewi Lestari" size="lg" status="online" />
                      <Avatar name="Eko Prasetyo" size="xl" status="offline" />
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* 6. CHECKBOX ATOM */}
            {selectedId === "checkbox" && (
              <DocCard
                title="Checkbox"
                badgeText="Atom"
                description="Kotak centang aksesibel dengan animasi transisi centang dan deskripsi pembantu."
                usageSnippet={`import { Checkbox } from '@aposis/design-system';\n\n<Checkbox label="Setuju syarat & ketentuan" />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-3">
                    <Checkbox
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                      label="Kirimkan notifikasi email ketika ada pembaruan data"
                      description="Anda dapat mengubah preferensi ini kapan saja di pengaturan profil."
                    />
                    <Checkbox label="Saya menyetujui syarat dan ketentuan penggunaan sistem Aposis" />
                    <Checkbox
                      disabled
                      checked
                      label="Fitur enkripsi end-to-end (Wajib aktif secara sistem)"
                    />
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* RADIO ATOM */}
            {selectedId === "radio" && (
              <DocCard
                title="Radio"
                badgeText="Atom"
                description="Elemen pilihan tunggal aksesibel berbasis Tailwind CSS murni dengan dukungan orientasi label (kanan, kiri, bawah, atas), varian card, dan RadioGroup helper."
                snippets={[
                  {
                    label: "Penggunaan Dasar",
                    desc: "Radio individual dengan label atau posisi label fleksibel.",
                    code: `import { Radio } from '@aposis/design-system';\n\n<Radio name="pilihan" value="1" label="Opsi Pertama" defaultChecked />\n<Radio name="pilihan" value="2" label="Opsi Kedua" />\n<Radio name="pilihan" value="3" label="Opsi Ketiga" labelPosition="bottom" />`,
                  },
                  {
                    label: "RadioGroup",
                    desc: "Pembungkus terpadu untuk mengelola nilai grup, label, deskripsi, dan pesan error.",
                    code: `import { RadioGroup, Radio } from '@aposis/design-system';\n\n<RadioGroup\n  label="Metode Pembayaran"\n  name="payment"\n  value={selectedPayment}\n  onChange={(val) => setSelectedPayment(val)}\n  orientation="horizontal"\n>\n  <Radio value="transfer" label="Transfer Bank" />\n  <Radio value="qris" label="QRIS" />\n  <Radio value="card" label="Kartu Kredit" />\n</RadioGroup>`,
                  },
                  {
                    label: "Varian Card",
                    desc: "Tampilan kotak kartu yang dapat diklik dengan deskripsi pembantu.",
                    code: `import { RadioGroup, Radio } from '@aposis/design-system';\n\n<RadioGroup value={plan} onChange={setPlan} className="grid grid-cols-1 gap-3 sm:grid-cols-2">\n  <Radio variant="card" value="starter" label="Starter" description="Untuk pengguna individu" />\n  <Radio variant="card" value="pro" label="Pro" description="Fitur lengkap untuk tim" />\n</RadioGroup>`,
                  },
                  {
                    label: "Di dalam FormField",
                    desc: "Dibungkus FormField dengan validasi dan penanganan error otomatis.",
                    code: `import { FormField, RadioGroup, Radio } from '@aposis/design-system';\n\n<FormField label="Metode Pembayaran" required helperText="Pilih salah satu" error={error}>\n  <RadioGroup name="payment" value={payment} onChange={setPayment} orientation="horizontal">\n    <Radio value="qris" label="QRIS Instan" />\n    <Radio value="va" label="Virtual Account" />\n  </RadioGroup>\n</FormField>`,
                  },
                ]}
              >
                <div className="space-y-6">
                  {/* 1. Interactive Live Radio Builder */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-200/80 dark:border-blue-900/60">
                    <CardHeader className="border-b bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900/80 border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Icon
                              icon={IconAdjustmentsHorizontal}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive Radio Builder (Pilih Varian, Ukuran &
                            Posisi Label)
                          </CardTitle>
                          <CardDescription>
                            Pilih konfigurasi di bawah untuk melihat preview
                            interaktif. Default bergaris tepi hitam/netral dan
                            otomatis berubah menjadi biru saat dipilih.
                          </CardDescription>
                        </div>
                        <Badge variant="primary" appearance="solid" size="sm">
                          Live Tester
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Controls Grid */}
                      <div className="grid grid-cols-1 gap-5 text-xs md:grid-cols-2">
                        {/* Left column: Variant, Size, LabelPosition */}
                        <div className="space-y-4">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              1. Pilih Varian Tampilan:
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {(["default", "card"] as const).map((v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => setRadioConfigVariant(v)}
                                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                                    radioConfigVariant === v
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {v === "default"
                                    ? "Lingkaran Biasa (Default)"
                                    : "Varian Kartu (Card)"}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              2. Pilih Ukuran (Size):
                            </label>
                            <div className="flex gap-2">
                              {(["sm", "md", "lg"] as const).map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setRadioConfigSize(s)}
                                  className={`px-3 py-1 rounded-lg uppercase font-medium transition-all cursor-pointer ${
                                    radioConfigSize === s
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {s === "sm"
                                    ? "SM (16px)"
                                    : s === "md"
                                      ? "MD (20px)"
                                      : "LG (24px)"}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              3. Posisi Label (labelPosition):
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {(
                                [
                                  { id: "right", label: "Kanan (Default)" },
                                  { id: "left", label: "Kiri" },
                                  { id: "bottom", label: "Bawah (Stacked)" },
                                  { id: "top", label: "Atas" },
                                  {
                                    id: "none",
                                    label: "Tanpa Label (Circle Only)",
                                  },
                                ] as const
                              ).map((pos) => (
                                <button
                                  key={pos.id}
                                  type="button"
                                  onClick={() => setRadioConfigLabelPos(pos.id)}
                                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                    radioConfigLabelPos === pos.id
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {pos.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right column: Mode, Orientation, Toggles, Custom Label */}
                        <div className="space-y-4">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              4. Mode Komponen:
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setRadioConfigMode("group")}
                                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                  radioConfigMode === "group"
                                    ? "bg-aposis-blue-60 text-white shadow-xs"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                RadioGroup (Multi-opsi)
                              </button>
                              <button
                                type="button"
                                onClick={() => setRadioConfigMode("single")}
                                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                  radioConfigMode === "single"
                                    ? "bg-aposis-blue-60 text-white shadow-xs"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                Single Radio (Atom)
                              </button>
                            </div>
                          </div>

                          {radioConfigMode === "group" && (
                            <div>
                              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                                5. Orientasi Susunan Grup:
                              </label>
                              <div className="flex gap-2">
                                {(["horizontal", "vertical"] as const).map(
                                  (ori) => (
                                    <button
                                      key={ori}
                                      type="button"
                                      onClick={() =>
                                        setRadioConfigOrientation(ori)
                                      }
                                      className={`px-3 py-1 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                                        radioConfigOrientation === ori
                                          ? "bg-aposis-blue-60 text-white shadow-xs"
                                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                      }`}
                                    >
                                      {ori}
                                    </button>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-[11px] uppercase tracking-wider">
                              6. Status & Opsi Tambahan:
                            </span>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={radioConfigDisabled}
                                  onChange={(e) =>
                                    setRadioConfigDisabled(e.target.checked)
                                  }
                                  className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                                />
                                <span className="text-slate-700 dark:text-slate-300">
                                  Status Disabled
                                </span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={radioConfigInvalid}
                                  onChange={(e) =>
                                    setRadioConfigInvalid(e.target.checked)
                                  }
                                  className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                                />
                                <span className="text-slate-700 dark:text-slate-300">
                                  Status Error (isInvalid)
                                </span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={radioConfigHasDesc}
                                  onChange={(e) =>
                                    setRadioConfigHasDesc(e.target.checked)
                                  }
                                  className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                                />
                                <span className="text-slate-700 dark:text-slate-300">
                                  Sertakan Deskripsi
                                </span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={radioConfigWrapForm}
                                  onChange={(e) =>
                                    setRadioConfigWrapForm(e.target.checked)
                                  }
                                  className="rounded text-aposis-blue-60 focus:ring-aposis-blue-50"
                                />
                                <span className="text-slate-700 dark:text-slate-300">
                                  Bungkus FormField
                                </span>
                              </label>
                            </div>
                          </div>

                          {radioConfigLabelPos !== "none" && (
                            <div>
                              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                                7. Kustom Teks Label:
                              </label>
                              <input
                                type="text"
                                value={radioConfigCustomLabel}
                                onChange={(e) =>
                                  setRadioConfigCustomLabel(e.target.value)
                                }
                                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-aposis-blue-50"
                                placeholder="Teks label radio..."
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Live Preview Area */}
                      <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between w-full pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Hasil Render Radio (Live Component):
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Pilihan Aktif:{" "}
                            <strong className="font-mono text-blue-600 dark:text-blue-400">
                              {radioConfigSelected}
                            </strong>
                          </span>
                        </div>

                        <div className="flex justify-center w-full py-2">
                          {radioConfigWrapForm ? (
                            <FormField
                              label="Pilih Kategori Layanan"
                              required
                              helperText="Silakan tentukan salah satu opsi untuk melanjutkan proses."
                              error={
                                radioConfigInvalid
                                  ? "Wajib memilih salah satu opsi layanan."
                                  : undefined
                              }
                              className="max-w-lg"
                            >
                              {radioConfigMode === "group" ? (
                                <RadioGroup
                                  name="interactive_builder_radio"
                                  value={radioConfigSelected}
                                  onChange={(val) =>
                                    setRadioConfigSelected(val)
                                  }
                                  size={radioConfigSize}
                                  variant={radioConfigVariant}
                                  orientation={radioConfigOrientation}
                                  labelPosition={
                                    radioConfigLabelPos === "none"
                                      ? "right"
                                      : radioConfigLabelPos
                                  }
                                  disabled={radioConfigDisabled}
                                  isInvalid={radioConfigInvalid}
                                  className={
                                    radioConfigVariant === "card"
                                      ? "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
                                      : undefined
                                  }
                                >
                                  <Radio
                                    value="opt1"
                                    label={
                                      radioConfigLabelPos === "none"
                                        ? undefined
                                        : radioConfigCustomLabel ||
                                          "Opsi Pertama"
                                    }
                                    aria-label={
                                      radioConfigLabelPos === "none"
                                        ? "Opsi Pertama"
                                        : undefined
                                    }
                                    description={
                                      radioConfigHasDesc &&
                                      radioConfigLabelPos !== "none"
                                        ? "Keterangan pembantu untuk opsi 1"
                                        : undefined
                                    }
                                  />
                                  <Radio
                                    value="opt2"
                                    label={
                                      radioConfigLabelPos === "none"
                                        ? undefined
                                        : "Opsi Kedua"
                                    }
                                    aria-label={
                                      radioConfigLabelPos === "none"
                                        ? "Opsi Kedua"
                                        : undefined
                                    }
                                    description={
                                      radioConfigHasDesc &&
                                      radioConfigLabelPos !== "none"
                                        ? "Keterangan pembantu untuk opsi 2"
                                        : undefined
                                    }
                                  />
                                  <Radio
                                    value="opt3"
                                    label={
                                      radioConfigLabelPos === "none"
                                        ? undefined
                                        : "Opsi Ketiga"
                                    }
                                    aria-label={
                                      radioConfigLabelPos === "none"
                                        ? "Opsi Ketiga"
                                        : undefined
                                    }
                                    description={
                                      radioConfigHasDesc &&
                                      radioConfigLabelPos !== "none"
                                        ? "Keterangan pembantu untuk opsi 3"
                                        : undefined
                                    }
                                  />
                                </RadioGroup>
                              ) : (
                                <Radio
                                  name="interactive_single_radio"
                                  value="opt1"
                                  checked={radioConfigSelected === "opt1"}
                                  onChange={() =>
                                    setRadioConfigSelected(
                                      radioConfigSelected === "opt1"
                                        ? ""
                                        : "opt1",
                                    )
                                  }
                                  size={radioConfigSize}
                                  variant={radioConfigVariant}
                                  labelPosition={
                                    radioConfigLabelPos === "none"
                                      ? "right"
                                      : radioConfigLabelPos
                                  }
                                  label={
                                    radioConfigLabelPos === "none"
                                      ? undefined
                                      : radioConfigCustomLabel ||
                                        "Pilihan Utama"
                                  }
                                  aria-label={
                                    radioConfigLabelPos === "none"
                                      ? "Pilihan Utama"
                                      : undefined
                                  }
                                  description={
                                    radioConfigHasDesc &&
                                    radioConfigLabelPos !== "none"
                                      ? "Keterangan pembantu di bawah label"
                                      : undefined
                                  }
                                  disabled={radioConfigDisabled}
                                  isInvalid={radioConfigInvalid}
                                />
                              )}
                            </FormField>
                          ) : radioConfigMode === "group" ? (
                            <RadioGroup
                              name="interactive_builder_radio"
                              value={radioConfigSelected}
                              onChange={(val) => setRadioConfigSelected(val)}
                              size={radioConfigSize}
                              variant={radioConfigVariant}
                              orientation={radioConfigOrientation}
                              labelPosition={
                                radioConfigLabelPos === "none"
                                  ? "right"
                                  : radioConfigLabelPos
                              }
                              disabled={radioConfigDisabled}
                              isInvalid={radioConfigInvalid}
                              className={
                                radioConfigVariant === "card"
                                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"
                                  : undefined
                              }
                            >
                              <Radio
                                value="opt1"
                                label={
                                  radioConfigLabelPos === "none"
                                    ? undefined
                                    : radioConfigCustomLabel || "Opsi Pertama"
                                }
                                aria-label={
                                  radioConfigLabelPos === "none"
                                    ? "Opsi Pertama"
                                    : undefined
                                }
                                description={
                                  radioConfigHasDesc &&
                                  radioConfigLabelPos !== "none"
                                    ? "Keterangan pembantu untuk opsi 1"
                                    : undefined
                                }
                              />
                              <Radio
                                value="opt2"
                                label={
                                  radioConfigLabelPos === "none"
                                    ? undefined
                                    : "Opsi Kedua"
                                }
                                aria-label={
                                  radioConfigLabelPos === "none"
                                    ? "Opsi Kedua"
                                    : undefined
                                }
                                description={
                                  radioConfigHasDesc &&
                                  radioConfigLabelPos !== "none"
                                    ? "Keterangan pembantu untuk opsi 2"
                                    : undefined
                                }
                              />
                              <Radio
                                value="opt3"
                                label={
                                  radioConfigLabelPos === "none"
                                    ? undefined
                                    : "Opsi Ketiga"
                                }
                                aria-label={
                                  radioConfigLabelPos === "none"
                                    ? "Opsi Ketiga"
                                    : undefined
                                }
                                description={
                                  radioConfigHasDesc &&
                                  radioConfigLabelPos !== "none"
                                    ? "Keterangan pembantu untuk opsi 3"
                                    : undefined
                                }
                              />
                            </RadioGroup>
                          ) : (
                            <Radio
                              name="interactive_single_radio"
                              value="opt1"
                              checked={radioConfigSelected === "opt1"}
                              onChange={() =>
                                setRadioConfigSelected(
                                  radioConfigSelected === "opt1" ? "" : "opt1",
                                )
                              }
                              size={radioConfigSize}
                              variant={radioConfigVariant}
                              labelPosition={
                                radioConfigLabelPos === "none"
                                  ? "right"
                                  : radioConfigLabelPos
                              }
                              label={
                                radioConfigLabelPos === "none"
                                  ? undefined
                                  : radioConfigCustomLabel || "Pilihan Utama"
                              }
                              aria-label={
                                radioConfigLabelPos === "none"
                                  ? "Pilihan Utama"
                                  : undefined
                              }
                              description={
                                radioConfigHasDesc &&
                                radioConfigLabelPos !== "none"
                                  ? "Keterangan pembantu di bawah label"
                                  : undefined
                              }
                              disabled={radioConfigDisabled}
                              isInvalid={radioConfigInvalid}
                            />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                          Coba klik pilihan di atas untuk menguji respons
                          visual, orientasi label, dan status error secara
                          langsung!
                        </div>
                      </div>

                      {/* Live Reactive TSX Code */}
                      <div className="overflow-hidden border shadow-xs rounded-xl bg-slate-950 border-slate-800">
                        <div className="flex items-center justify-between px-4 py-2 font-mono text-xs border-b border-slate-800 bg-slate-900/90 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Icon
                              icon={IconCode}
                              size="sm"
                              className="text-aposis-blue-40"
                            />
                            Kode TSX:
                          </span>
                          <button
                            type="button"
                            onClick={() => copySnippet(dynamicRadioCode)}
                            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                          >
                            {copiedCode ? (
                              <Icon
                                icon={IconCheck}
                                size="sm"
                                className="text-emerald-400"
                              />
                            ) : (
                              <Icon icon={IconCopy} size="sm" />
                            )}
                            <span>
                              {copiedCode ? "Tersalin!" : "Salin Kode"}
                            </span>
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre select-all text-sky-300">
                          <code>{dynamicRadioCode}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 2. Real-World Presets / Skenario Populer */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>
                        Koleksi Contoh Skenario Populer (Siap Pakai)
                      </CardTitle>
                      <CardDescription>
                        Preset siap pakai untuk varian card interaktif dan
                        orientasi stacked vertikal sesuai board Figma.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Preset 1: Card Selector */}
                        <div className="p-4 space-y-3 border rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Preset 1: Pilihan Peran Akun (Card Variant)
                            </span>
                            <Badge variant="primary" size="sm">
                              Varian Card
                            </Badge>
                          </div>
                          <RadioGroup
                            defaultValue="teacher"
                            orientation="vertical"
                            className="gap-2.5"
                          >
                            <Radio
                              variant="card"
                              value="teacher"
                              label="Tenaga Pendidik"
                              description="Input nilai, absensi, dan jadwal mengajar harian"
                            />
                            <Radio
                              variant="card"
                              value="staff"
                              label="Staf Tata Usaha"
                              description="Pengelolaan arsip surat dan administrasi sekolah"
                            />
                          </RadioGroup>
                        </div>

                        {/* Preset 2: Stacked Vertical (Figma Board) */}
                        <div className="p-4 space-y-3 border rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Preset 2: Posisi Label Bawah (Stacked Vertikal)
                            </span>
                            <Badge variant="neutral" size="sm">
                              Figma 53-3380
                            </Badge>
                          </div>
                          <div className="p-3 bg-white border rounded-lg dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <RadioGroup
                              defaultValue="sem1"
                              orientation="horizontal"
                              className="justify-around py-2"
                            >
                              <Radio
                                value="sem1"
                                labelPosition="bottom"
                                label="Semester 1"
                              />
                              <Radio
                                value="sem2"
                                labelPosition="bottom"
                                label="Semester 2"
                              />
                              <Radio
                                value="pend"
                                labelPosition="bottom"
                                label="Remedial"
                              />
                            </RadioGroup>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Sangat cocok untuk tata letak ringkas horizontal
                            dengan teks yang berpusat di bawah lingkaran radio.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* TOOLTIP MOLECULE */}
            {selectedId === "tooltip" && (
              <DocCard
                title="Tooltip"
                badgeText="Molecule"
                description="Komponen tooltip tingkat molekul aksesibel dengan dukungan panah penunjuk (beak arrow), penentuan posisi otomatis (auto) atau terarah, kustomisasi styling via className, varian definition (garis bawah titik-titik), serta navigasi keyboard."
                snippets={tooltipSnippets}
              >
                <div className="space-y-6">
                  {/* 1. Interactive Live Tester */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-20/60">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon
                              icon={IconHelpCircle}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive Tooltip Tester
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Pilih konfigurasi di bawah untuk menguji respons
                            visual hover / keyboard focus serta menyalin kode
                            TSX reaktif.
                          </CardDescription>
                        </div>
                        <Badge variant="primary" appearance="solid" size="sm">
                          Live Tester
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                      {/* Controls Grid */}
                      <div className="grid grid-cols-1 gap-5 text-xs md:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              1. Posisi Penempatan (pos):
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {(
                                [
                                  { id: "auto", label: "Auto (Pintar)" },
                                  { id: "top", label: "Top" },
                                  { id: "top-start", label: "Top Start" },
                                  { id: "top-end", label: "Top End" },
                                  { id: "bottom", label: "Bottom" },
                                  { id: "bottom-start", label: "Bottom Start" },
                                  { id: "bottom-end", label: "Bottom End" },
                                  { id: "left", label: "Left" },
                                  { id: "right", label: "Right" },
                                ] as const
                              ).map((p) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => setTooltipPos(p.id)}
                                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                    tooltipPos === p.id
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              2. Pilih Ukuran (Size):
                            </label>
                            <div className="flex gap-2">
                              {(["sm", "md", "lg"] as const).map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setTooltipSize(s)}
                                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer uppercase ${
                                    tooltipSize === s
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              3. Varian Trigger (variant):
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setTooltipVariant("default")}
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                  tooltipVariant === "default"
                                    ? "bg-aposis-blue-60 text-white shadow-xs"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                Default (Icon / Tombol)
                              </button>
                              <button
                                type="button"
                                onClick={() => setTooltipVariant("definition")}
                                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                  tooltipVariant === "definition"
                                    ? "bg-aposis-blue-60 text-white shadow-xs"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                Definition (Dotted Underline)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-[11px] uppercase tracking-wider">
                              4. Opsi Tambahan:
                            </span>
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={tooltipArrow}
                                onChange={(e) =>
                                  setTooltipArrow(e.target.checked)
                                }
                                className="rounded border-slate-300 text-aposis-blue-60 focus:ring-aposis-blue-40"
                              />
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                Tampilkan Panah Petunjuk (Arrow)
                              </span>
                            </label>
                          </div>

                          <div>
                            <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                              5. Teks Konten Tooltip:
                            </label>
                            <input
                              type="text"
                              value={tooltipText}
                              onChange={(e) => setTooltipText(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-aposis-blue-50"
                              placeholder="Tuliskan pesan tooltip..."
                            />
                          </div>

                          {tooltipVariant === "definition" && (
                            <div>
                              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                                6. Teks Istilah (Trigger):
                              </label>
                              <input
                                type="text"
                                value={tooltipTriggerText}
                                onChange={(e) =>
                                  setTooltipTriggerText(e.target.value)
                                }
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-aposis-blue-50"
                                placeholder="Tuliskan kata atau istilah..."
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Preview Interactive Arena */}
                      <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/50 flex flex-col items-center justify-center min-h-[160px] gap-3">
                        <div className="flex items-center justify-center py-6">
                          <Tooltip
                            text={tooltipText || "Tooltip text"}
                            pos={tooltipPos}
                            size={tooltipSize}
                            variant={tooltipVariant}
                            arrow={tooltipArrow}
                          >
                            {tooltipVariant === "definition" ? (
                              tooltipTriggerText || "Definition tooltip"
                            ) : (
                              <button
                                type="button"
                                className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 shadow-xs hover:border-blue-400 transition-colors cursor-pointer"
                                aria-label="Contoh Pemicu Tooltip"
                              >
                                <IconHelpCircle size={24} />
                              </button>
                            )}
                          </Tooltip>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                          Arahkan kursor atau gunakan tombol Tab pada keyboard
                          untuk menguji respons visual kemunculan tooltip!
                        </div>
                      </div>

                      {/* Live Reactive TSX Code */}
                      <div className="overflow-hidden border shadow-xs rounded-xl bg-slate-950 border-slate-800">
                        <div className="flex items-center justify-between px-4 py-2 font-mono text-xs border-b border-slate-800 bg-slate-900/90 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Icon
                              icon={IconCode}
                              size="sm"
                              className="text-aposis-blue-40"
                            />
                            Kode TSX:
                          </span>
                          <button
                            type="button"
                            onClick={() => copySnippet(dynamicTooltipCode)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedCode ? (
                              <Icon
                                icon={IconCheck}
                                size="sm"
                                className="text-emerald-400"
                              />
                            ) : (
                              <Icon icon={IconCopy} size="sm" />
                            )}
                            {copiedCode ? "Tersalin" : "Salin Kode"}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
                          <code>{dynamicTooltipCode}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 2. Full Figma Board Showcase (Node 67-1714) */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Spesifikasi Lengkap Figma (Node 67-1714)
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Seluruh variasi orientasi panah dan bentuk trigger
                        sesuai rancangan resmi Figma Aposis.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Section A: Icon Trigger Tooltips */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Variasi 1: Icon Trigger dengan Ragam Posisi & Arah
                            Panah
                          </span>
                          <Badge variant="neutral" size="sm">
                            Figma 67-1714
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-6 p-6 border md:grid-cols-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border-slate-200 dark:border-slate-800">
                          {/* Column 1: Top (Panah Bawah) */}
                          <div className="flex flex-col items-center space-y-10">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                              Posisi Atas (Top)
                            </span>
                            <div className="py-4">
                              <Tooltip text="Tooltip text" pos="top" isOpen>
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="top-start"
                                isOpen
                              >
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip text="Tooltip text" pos="top-end" isOpen>
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                          </div>

                          {/* Column 2: Bottom (Panah Atas) */}
                          <div className="flex flex-col items-center space-y-10">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                              Posisi Bawah (Bottom)
                            </span>
                            <div className="py-4">
                              <Tooltip text="Tooltip text" pos="bottom" isOpen>
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="bottom-start"
                                isOpen
                              >
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="bottom-end"
                                isOpen
                              >
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                          </div>

                          {/* Column 3: Samping (Left & Right) */}
                          <div className="flex flex-col items-center space-y-10">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                              Posisi Samping (Left / Right)
                            </span>
                            <div className="py-4">
                              <Tooltip text="Tooltip text" pos="left" isOpen>
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip text="Tooltip text" pos="right" isOpen>
                                <div className="p-2 text-slate-600 dark:text-slate-300">
                                  <IconHelpCircle size={22} />
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section B: Definition Tooltips */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Variasi 2: Definition Tooltip (Teks Bergaris
                            Titik-titik)
                          </span>
                          <Badge variant="neutral" size="sm">
                            Figma 67-1714
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-8 p-6 border sm:grid-cols-2 md:grid-cols-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border-slate-200 dark:border-slate-800">
                          {/* Definition Tooltip Top */}
                          <div className="flex flex-col items-center gap-12">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                              Definition (Top)
                            </span>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="top"
                                variant="definition"
                                isOpen
                              >
                                Definition tooltip
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="top-start"
                                variant="definition"
                                isOpen
                              >
                                Definition tooltip
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="top-end"
                                variant="definition"
                                isOpen
                              >
                                Definition tooltip
                              </Tooltip>
                            </div>
                          </div>

                          {/* Definition Tooltip Bottom */}
                          <div className="flex flex-col items-center gap-12">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                              Definition (Bottom)
                            </span>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="bottom"
                                variant="definition"
                                isOpen
                              >
                                Definition tooltip
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="bottom-start"
                                variant="definition"
                                isOpen
                              >
                                Definition tooltip
                              </Tooltip>
                            </div>
                            <div className="py-4">
                              <Tooltip
                                text="Tooltip text"
                                pos="bottom-end"
                                variant="definition"
                                isOpen
                              >
                                Definition tooltip
                              </Tooltip>
                            </div>
                          </div>

                          {/* Definition Tooltip Inline Prose Demo */}
                          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              Penerapan dalam Kalimat
                            </span>
                            <div className="p-4 text-xs leading-relaxed bg-white border rounded-lg dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                              Aplikasi raport terpadu Aposis telah sesuai dengan
                              format kurikulum nasional{" "}
                              <Tooltip
                                text="Kurikulum Merdeka Belajar Kementerian Pendidikan RI"
                                variant="definition"
                              >
                                Kumer
                              </Tooltip>{" "}
                              dan otomatis menghasilkan laporan capaian
                              kompetensi{" "}
                              <Tooltip
                                text="Rencana Pelaksanaan Pembelajaran Harian Terstandar"
                                variant="definition"
                              >
                                RPPH
                              </Tooltip>{" "}
                              bagi guru dan wali kelas.
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Arahkan kursor pada kata yang bergaris bawah
                              titik-titik untuk membaca penjelasannya.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* 7. SPINNER ATOM */}
            {selectedId === "spinner" && (
              <DocCard
                title="Spinner"
                badgeText="Atom"
                description="Animasi pemuatan SVG ringan dalam berbagai ukuran dan warna."
                usageSnippet={`import { Spinner } from '@aposis/design-system';\n\n<Spinner size="md" variant="primary" />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Spinner size="xs" />
                      <Spinner size="sm" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* MOLECULES: FORM FIELD */}
            {selectedId === "form-field" && (
              <DocCard
                title="FormField"
                badgeText="Molecule"
                description="Komponen pembungkus terpadu yang menyatukan label, tanda wajib (*), input kontrol, helper text, dan pesan error."
                usageSnippet={`import { FormField, Input } from '@aposis/design-system';\n\n<FormField label="NISN" required helperText="10 digit nomor">\n  <Input placeholder="0051283921" />\n</FormField>`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="max-w-md pt-6 space-y-4">
                    <FormField
                      label="Nomor Induk Siswa Nasional (NISN)"
                      required
                      helperText="10 digit angka resmi dari Kemdikbud"
                    >
                      <Input
                        placeholder="Contoh: 0051283921"
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </FormField>
                    <FormField
                      label="Kata Sandi Baru"
                      required
                      error="Kata sandi minimal 8 karakter"
                    >
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </FormField>
                    <FormField
                      label="Status Keaktifan Akademik"
                      required
                      helperText="Pilih salah satu status administratif siswa"
                    >
                      <RadioGroup
                        name="student_status_demo"
                        defaultValue="aktif"
                        orientation="horizontal"
                      >
                        <Radio value="aktif" label="Aktif" />
                        <Radio value="cuti" label="Cuti Akademik" />
                        <Radio value="pindah" label="Pindah Sekolah" />
                      </RadioGroup>
                    </FormField>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* MOLECULES: SEARCH BAR */}
            {selectedId === "search-bar" && (
              <DocCard
                title="SearchBar"
                badgeText="Molecule"
                description="Input pencarian data dengan tombol pembersih (clear) instan dan indikator shortcut keyboard."
                usageSnippet={`import { SearchBar } from '@aposis/design-system';\n\n<SearchBar placeholder="Cari data..." onSearch={(val) => console.log(val)} />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <SearchBar
                      placeholder="Cari siswa, guru, kelas..."
                      onSearch={(q) => alert(`Mencari: ${q}`)}
                    />
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* MOLECULES: ALERT */}
            {selectedId === "alert" && (
              <DocCard
                title="Alert"
                badgeText="Molecule"
                description="Banner notifikasi kontekstual untuk memberikan umpan balik (info, success, warning, danger) kepada pengguna."
                usageSnippet={`import { Alert } from '@aposis/design-system';\n\n<Alert variant="success" title="Berhasil">Data telah disimpan.</Alert>`}
              >
                <div className="space-y-3">
                  {isAlertVisible && (
                    <Alert
                      variant="info"
                      title="Pembaruan Sistem Tersedia"
                      onClose={() => setIsAlertVisible(false)}
                    >
                      Versi 3.1 dari Aposis Design System telah dimuat.
                    </Alert>
                  )}
                  <Alert variant="success" title="Sinkronisasi Berhasil">
                    Data 500 siswa telah berhasil diperbarui.
                  </Alert>
                  <Alert variant="warning" title="Peringatan">
                    Koneksi database kedua mengalami latensi tinggi.
                  </Alert>
                  <Alert variant="danger" title="Gagal Menyimpan">
                    Token autentikasi sesi telah kedaluwarsa.
                  </Alert>
                </div>
              </DocCard>
            )}

            {/* MOLECULES: MODAL */}
            {selectedId === "modal" && (
              <DocCard
                title="Modal"
                badgeText="Molecule"
                description="Jendela dialog mengambang aksesibel dengan backdrop blur, header, body yang dapat di-scroll, dan action footer."
                usageSnippet={`import { Modal, Button } from '@aposis/design-system';\n\n<Modal isOpen={open} onClose={() => setOpen(false)} title="Hapus Data">\n  <p>Konfirmasi tindakan?</p>\n</Modal>`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <Button onClick={() => setIsModalOpen(true)}>
                      Buka Contoh Modal Dialog
                    </Button>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* MOLECULES: TABS */}
            {selectedId === "tabs" && (
              <DocCard
                title="Tabs"
                badgeText="Molecule"
                description="Navigasi tab dengan dua varian tampilan: garis bawah (underline) dan tombol kapsul (pills)."
                usageSnippet={`import { Tabs } from '@aposis/design-system';\n\n<Tabs items={[{ id: 'tab1', label: 'Tab 1' }]} activeTab={active} onChange={setActive} />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <span className="block mb-2 text-xs font-semibold text-slate-500">
                        Varian Underline
                      </span>
                      <Tabs
                        items={[
                          { id: "tab1", label: "Profil Siswa" },
                          { id: "tab2", label: "Riwayat Nilai" },
                          { id: "tab3", label: "Dokumen" },
                        ]}
                        activeTab={activeTabDemo}
                        onChange={setActiveTabDemo}
                        variant="underline"
                      />
                    </div>

                    <div>
                      <span className="block mb-2 text-xs font-semibold text-slate-500">
                        Varian Pills
                      </span>
                      <Tabs
                        items={[
                          { id: "tab1", label: "Harian" },
                          { id: "tab2", label: "Mingguan" },
                          { id: "tab3", label: "Bulanan" },
                        ]}
                        activeTab={activeTabDemo}
                        onChange={setActiveTabDemo}
                        variant="pills"
                      />
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* MOLECULES: TOGGLE */}
            {selectedId === "toggle" && (
              <DocCard
                title="Toggle"
                badgeText="Molecule"
                description="Komponen sakelar (switch) interaktif untuk mengubah status aktif/non-aktif secara langsung."
                usageSnippet={`import { Toggle } from '@aposis/design-system';\n\n<Toggle label="Aktifkan Notifikasi" checked={enabled} onChange={setEnabled} />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-6">
                    {/* Varian Demo 1: Standar Interaktif */}
                    <div className="space-y-2">
                      <span className="block text-xs font-semibold tracking-wider uppercase text-slate-500">
                        Toggle Interaktif
                      </span>
                      <Toggle
                        label="Aktifkan Notifikasi"
                        description="Kirim notifikasi otomatis saat nilai rapor siswa diperbarui"
                        checked={isNotifActive}
                        onChange={(checked) => setIsNotifActive(checked)}
                      />
                    </div>

                    {/* Varian Demo 2: State Disabled / Default */}
                    <div className="pt-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="block text-xs font-semibold tracking-wider uppercase text-slate-500">
                        Variasi Status
                      </span>
                      <div className="flex flex-col gap-3">
                        <Toggle label="Toggle Nonaktif (Disabled)" disabled />
                        <Toggle
                          label="Toggle Nonaktif Aktif (Disabled & Checked)"
                          disabled
                          checked
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}
            
            {/* MOLECULES: PROGRESS BAR */}
            {selectedId === 'progress-bar' && (
              <DocCard
                badgeText="Molecule"
                title="ProgressBar"
                description="Komponen indikator progres dengan variasi thickness (sm & md)."
                usageSnippet={`import { ProgressBar } from '../molecules';

            // Small (4px track)
            <ProgressBar value={50} label="Subtitle" size="sm" />

            // Medium (8px track)
            <ProgressBar value={50} label="Subtitle" size="md" />`}
              >
                <div className="max-w-xl p-4 space-y-6 bg-white border rounded-lg dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500">Thickness: Small (4px)</p>
                    <ProgressBar value={10} label="Subtitle" size="sm" />
                    <ProgressBar value={50} label="Subtitle" size="sm" />
                    <ProgressBar value={100} label="Subtitle" size="sm" />
                  </div>

                  <div className="pt-4 space-y-3 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500">Thickness: Medium (8px)</p>
                    <ProgressBar value={10} label="Subtitle" size="md" />
                    <ProgressBar value={50} label="Subtitle" size="md" />
                    <ProgressBar value={100} label="Subtitle" size="md" />
                  </div>
                </div>
              </DocCard>
            )}

              {/* MOLECULES: PASSWORD INPUT */}
              {selectedId === "password-input" && (
              <DocCard
                title="Password Input"
                badgeText="Molecule"
                description="Komponen input kata sandi khusus dilengkapi dengan tombol toggle penglihatan (show/hide password) dan dukungan 4 variasi ukuran."
                snippets={passwordInputSnippets}
                tips={
                  <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
                    <div className="font-semibold mb-1 flex items-center gap-1.5">
                      <Icon icon={IconInfoCircle} size="sm" />
                      Fitur Password Input:
                    </div>
                    Menggunakan prop <code className="font-semibold text-aposis-blue-60">inputSize</code> ("xs" | "sm" | "md" | "lg") untuk mengatur ukuran. Mengonsumsi prop <code className="font-semibold text-aposis-blue-60">error</code> atau <code className="font-semibold text-aposis-blue-60">warning</code> untuk memberikan indikasi status warna secara otomatis.
                  </div>
                }
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-6">
                    {/* 1. Matriks Variasi Ukuran */}
                    <div>
                      <label className="block mb-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        1. Variasi Ukuran (Extra Small, Small, Medium, Large)
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Extra Small (xs)</span>
                          <PasswordInput inputSize="xs" placeholder="Password text..." />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Small (sm)</span>
                          <PasswordInput inputSize="sm" placeholder="Password text..." />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Medium (md)</span>
                          <PasswordInput inputSize="md" placeholder="Password text..." />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Large (lg)</span>
                          <PasswordInput inputSize="lg" placeholder="Password text..." />
                        </div>
                      </div>
                    </div>

                    {/* 2. Matriks Status State */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                      <label className="block mb-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        2. Status State (Default, Warning, Error)
                      </label>
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <div>
                          <span className="text-[11px] text-slate-500 mb-1.5 block">Default Masked</span>
                          <PasswordInput inputSize="md" defaultValue="rahasia123" />
                        </div>
                        <div>
                          <span className="text-[11px] text-amber-600 mb-1.5 block">Warning State</span>
                          <PasswordInput inputSize="md" warning="Password terlalu pendek" defaultValue="12345" />
                        </div>
                        <div>
                          <span className="text-[11px] text-rose-500 mb-1.5 block">Error State</span>
                          <PasswordInput inputSize="md" error="Kombinasi password salah" defaultValue="salahpass" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* MOLECULES: BREADCRUMBS */}
            {selectedId === "breadcrumb" && (
              <DocCard
                badgeText="Molecule"
                title="Breadcrumb"
                description="Komponen navigasi hierarki dengan dukungan helper pembuat otomatis dari URL path."
                usageSnippet={`import { Breadcrumb } from '../molecules';
                import { generateBreadcrumbs } from '../utils/breadcrumb';

                // Dihasilkan otomatis dari path: "/dashboard/settings/user-profile"
                const items = generateBreadcrumbs(location.pathname);

                <Breadcrumb items={items} />`}
              >
                <div className="p-4 space-y-6 bg-white border rounded-lg dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      1. Manual Items:
                    </p>
                    <Breadcrumbs
                      items={[
                        { label: "Home", href: "#" },
                        { label: "Projects", href: "#" },
                        { label: "Design System", active: true },
                      ]}
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      2. Auto Generated from Path:
                    </p>
                    <Breadcrumbs items={autoGeneratedItems} />
                  </div>
                </div>
              </DocCard>
            )}

            {/* TAG MOLECULE */}
            {selectedId === "tag" && (
              <DocCard
                title="Tag & Tag Group"
                badgeText="Molecule v3.1"
                description="Komponen Tag digunakan untuk mengelompokkan kata kunci, kategori, atau status item. Mendukung pemicu ikon pemicu (leading icon), tombol tutup (close button), dan pembungkus TagGroup dengan label."
                snippets={[
                  {
                    language: "tsx",
                    filename: "TagExample.tsx",
                    code: `import { Tag, TagGroup } from '@/components/molecules/Tag/Tag';

            <TagGroup label="Label Kategori">
              <Tag color="slate" size="large">Tag 1</Tag>
              <Tag color="slate" size="large" icon={<span>+</span>}>Tag dengan Icon</Tag>
              <Tag color="slate" size="large" onClose={() => console.log('closed')}>Dismissible Tag</Tag>
            </TagGroup>`,
                  },
                ]}
              >
                <div className="space-y-6">
                  <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800 border-slate-200">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-100">
                        Tag Group Demonstration
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                      {/* 1. Large Tags (Tanpa Icon & Dengan Icon) */}
                      <TagGroup label="Large Tags (32px)">
                        <Tag size="large">Tag 1</Tag>
                        <Tag size="large">Tag 2</Tag>
                        <Tag
                          size="large"
                          icon={
                            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          }
                        >
                          Dengan Icon
                        </Tag>
                      </TagGroup>

                      {/* 2. Medium Tags */}
                      <TagGroup label="Medium Tags (28px)">
                        <Tag size="medium">Tag 1</Tag>
                        <Tag size="medium">Tag 2</Tag>
                        <Tag
                          size="medium"
                          icon={
                            <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          }
                        >
                          Dengan Icon
                        </Tag>
                      </TagGroup>

                      {/* 3. Small Tags */}
                      <TagGroup label="Small Tags (24px)">
                        <Tag size="small">Tag 1</Tag>
                        <Tag size="small">Tag 2</Tag>
                        <Tag
                          size="small"
                          icon={
                            <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          }
                        >
                          Dengan Icon
                        </Tag>
                      </TagGroup>

                      {/* 4. Extra Small Tags */}
                      <TagGroup label="Extra Small Tags (20px)">
                        <Tag size="extra-small">Tag 1</Tag>
                        <Tag size="extra-small">Tag 2</Tag>
                        <Tag
                          size="extra-small"
                          icon={
                            <svg className="w-2.5 h-2.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          }
                        >
                          Dengan Icon
                        </Tag>
                      </TagGroup>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

          {/* OVERFLOW MENU MOLECULE */}
            {selectedId === "overflow-menu" && (
              <DocCard
                title="Overflow Menu"
                badgeText="Molecule v3.1"
                description="Komponen Overflow Menu (titik tiga) menyajikan daftar aksi lanjutan secara ringkas. Mendukung 4 orientasi arah kemunculan menu: Kiri Bawah, Kanan Bawah, Kiri Atas (Dropup), dan Kanan Atas (Dropup)."
                snippets={[
                  {
                    filename: "OverflowMenuExample.tsx",
                    code: `import { OverflowMenu } from '@/components/molecules/OverflowMenu/OverflowMenu';

            // Menu Ke Bawah (Default)
            <OverflowMenu align="left" position="bottom" items={items} />
            <OverflowMenu align="right" position="bottom" items={items} />

            // Menu Ke Atas (Dropup)
            <OverflowMenu align="left" position="top" items={items} />
            <OverflowMenu align="right" position="top" items={items} />`,
                  },
                ]}
              >
                <div className="space-y-6">
                  <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800 border-slate-200">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-100">
                        Figma Overflow Menu Position Showcase
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Klik masing-masing titik tiga untuk menguji respons kemunculan menu di 4 sudut posisi yang berbeda.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-8">
                      {/* Section 1: Menu Ke Bawah (Dropdown) */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                          1. Menu Ke Bawah (Position: Bottom)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 min-h-[220px]">
                          {/* Kiri Bawah */}
                          <div className="flex items-center justify-between p-4 bg-white border dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                            <OverflowMenu
                              align="left"
                              position="bottom"
                              items={[
                                { id: '1', label: 'Option 1' },
                                { id: '2', label: 'Option 2' },
                                { id: '3', label: 'Option 3' },
                              ]}
                            />
                            <span className="text-xs text-slate-400">Kiri Bawah</span>
                          </div>

                          {/* Kanan Bawah */}
                          <div className="flex items-center justify-between p-4 bg-white border dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                            <span className="text-xs text-slate-400">Kanan Bawah</span>
                            <OverflowMenu
                              align="right"
                              position="bottom"
                              items={[
                                { id: '1', label: 'Option 1' },
                                { id: '2', label: 'Option 2' },
                                { id: '3', label: 'Option 3' },
                              ]}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Menu Ke Atas (Dropup) */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                          2. Menu Ke Atas (Position: Top / Dropup)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 min-h-[220px] items-end">
                          {/* Kiri Atas */}
                          <div className="flex items-center justify-between p-4 bg-white border dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                            <OverflowMenu
                              align="left"
                              position="top"
                              items={[
                                { id: '1', label: 'Option 1' },
                                { id: '2', label: 'Option 2' },
                                { id: '3', label: 'Option 3' },
                              ]}
                            />
                            <span className="text-xs text-slate-400">Kiri Atas (Dropup)</span>
                          </div>

                          {/* Kanan Atas */}
                          <div className="flex items-center justify-between p-4 bg-white border dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                            <span className="text-xs text-slate-400">Kanan Atas (Dropup)</span>
                            <OverflowMenu
                              align="right"
                              position="top"
                              items={[
                                { id: '1', label: 'Option 1' },
                                { id: '2', label: 'Option 2' },
                                { id: '3', label: 'Option 3' },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}
            {/* DROPDOWN MOLECULE */}
            {selectedId === "dropdown" && (
              <DocCard
                title="Dropdown"
                badgeText="Molecule v3.1"
                description="Komponen molekul Dropdown interaktif yang mendukung variasi Single Select dan Multiselect (dengan chip badge & tombol clear), status validasi (Error & Warning), mode Read-Only / Disabled, serta kustomisasi 4 ukuran (Large, Medium, Small, Extra Small)."
                snippets={[
                  {
                    language: "tsx",
                    filename: "SingleSelectExample.tsx",
                    code: `import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';

                <Dropdown
                  label="Pilih Jurusan"
                  placeholder="Pilih Opsi"
                  options={[
                    { label: 'Opsi 1', value: '1' },
                    { label: 'Opsi 2', value: '2' },
                  ]}
                  value={singleValue}
                  onChange={(val) => setSingleValue(val as string)}
                  helperText="Pilih salah satu jurusan."
                />`,
                  },
                  {
                    language: "tsx",
                    filename: "MultiSelectExample.tsx",
                    code: `import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';

                  <Dropdown
                    label="Pilih Mata Pelajaran"
                    placeholder="Pilih Opsi"
                    isMulti
                    options={[
                      { label: 'Opsi 1', value: '1' },
                      { label: 'Opsi 2', value: '2' },
                    ]}
                    value={multiValue}
                    onChange={(val) => setMultiValue(val as string[])}
                    helperText="Klik icon '✕' pada chip untuk menghapus semua pilihan."
                  />`,
                  },
                ]}
              >
                <div className="space-y-6">
                  {/* 1. Interactive Showcase Section */}
                  <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800 border-slate-200">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-100">
                            Showcase & Interactive States
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Uji coba berbagai variasi state, validasi, serta
                            opsi Single & Multiselect.
                          </CardDescription>
                        </div>
                        <Badge variant="primary" appearance="solid" size="sm">
                          Live Preview
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-8">
                      {/* Section A: Selection Modes */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          1. Mode Pemilihan (Single vs Multiselect)
                        </h4>
                        <div className="grid grid-cols-1 gap-6 p-4 border md:grid-cols-2 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                          <Dropdown
                            label="Single Select"
                            placeholder="Pilih Opsi"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                              { label: "Opsi 3", value: "3" },
                              {
                                label: "Opsi Disabled",
                                value: "4",
                                disabled: true,
                              },
                            ]}
                            value={singleValue}
                            onChange={(val) => setSingleValue(val as string)}
                            helperText="Menampilkan 1 opsi terpilih"
                          />

                          <Dropdown
                            label="Multiselect"
                            placeholder="Pilih Opsi"
                            isMulti
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                              { label: "Opsi 3", value: "3" },
                              {
                                label: "Opsi Disabled",
                                value: "4",
                                disabled: true,
                              },
                            ]}
                            value={multiValue}
                            onChange={(val) => setMultiValue(val as string[])}
                            helperText="Klik icon '✕' pada chip untuk mengosongkan nilai"
                          />
                        </div>
                      </div>

                      {/* Section B: Validation States */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          2. Status Validasi & Aksesibilitas
                        </h4>
                        <div className="grid grid-cols-1 gap-6 p-4 border md:grid-cols-2 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                          <Dropdown
                            label="Error State"
                            placeholder="Pilih Opsi"
                            state="error"
                            errorMessage="Error message goes here"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />

                          <Dropdown
                            label="Warning State"
                            placeholder="Pilih Opsi"
                            state="warning"
                            warningMessage="Warning message goes here"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />

                          <Dropdown
                            label="Disabled State"
                            placeholder="Pilih Opsi"
                            disabled
                            helperText="Input tidak dapat diinteraksi"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />

                          <Dropdown
                            label="Read Only State"
                            readOnly
                            helperText="Hanya menampilkan nilai tanpa aksi trigger"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />
                        </div>
                      </div>

                      {/* Section C: Size Variations */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          3. Variasi Ukuran (Sizes)
                        </h4>
                        <div className="grid items-end grid-cols-1 gap-4 p-4 border sm:grid-cols-2 md:grid-cols-4 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                          <Dropdown
                            label="Large (48px)"
                            size="large"
                            placeholder="Pilih Opsi"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />

                          <Dropdown
                            label="Medium (44px)"
                            size="medium"
                            placeholder="Pilih Opsi"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />

                          <Dropdown
                            label="Small (36px)"
                            size="small"
                            placeholder="Pilih Opsi"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />

                          <Dropdown
                            label="Extra Small (32px)"
                            size="extra-small"
                            placeholder="Pilih Opsi"
                            options={[
                              { label: "Opsi 1", value: "1" },
                              { label: "Opsi 2", value: "2" },
                            ]}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* MOLECULES: NOTIFICATION */}
            {selectedId === "notification" && (
              <DocCard
                title="Notification"
                badgeText="Molecule"
                description="Komponen notifikasi tingkat molekul dengan 4 varian semantik resmi (info, success, warning, error). Mendukung pemanggilan toast melayang secara programatis via notification.show(), progress bar durasi otomatis di atas atau di bawah tergantung posisi, animasi masuk, tombol aksi (actionTrigger), serta 2 gaya multiple notifikasi: default (daftar berurutan) dan stacking (kartu bertumpuk)."
                snippets={notificationSnippets}
              >
                <div className="space-y-6">
                  {/* 1. Interactive Live Tester */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-20/60">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon
                              icon={IconBell}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive Notification Tester & Live Trigger
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Sesuaikan konfigurasi props di bawah, lalu klik
                            tombol uji untuk memunculkan notifikasi melayang
                            (toast) secara interaktif dengan animasi masuk.
                          </CardDescription>
                        </div>
                        <Badge variant="primary" appearance="solid" size="sm">
                          Live Tester
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                      {/* Controls Grid */}
                      <div className="grid grid-cols-1 gap-5 text-xs md:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              1. Varian Semantik (variant):
                            </label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                              {(
                                [
                                  {
                                    id: "info",
                                    label: "Info (Biru)",
                                    bg: "bg-blue-600",
                                  },
                                  {
                                    id: "success",
                                    label: "Success (Hijau)",
                                    bg: "bg-emerald-600",
                                  },
                                  {
                                    id: "warning",
                                    label: "Warning (Kuning)",
                                    bg: "bg-amber-500",
                                  },
                                  {
                                    id: "error",
                                    label: "Error (Merah)",
                                    bg: "bg-rose-600",
                                  },
                                ] as const
                              ).map((v) => (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() => setNotifVariant(v.id)}
                                  className={`px-2.5 py-1.5 rounded-lg font-medium text-center transition-all cursor-pointer ${
                                    notifVariant === v.id
                                      ? `${v.bg} text-white shadow-xs font-semibold ring-2 ring-offset-1 ring-slate-400`
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {v.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              2. Posisi Layar (pos):
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {(
                                [
                                  { id: "top-left", label: "Top Left" },
                                  { id: "top-center", label: "Top Center" },
                                  { id: "top-right", label: "Top Right" },
                                  { id: "bottom-left", label: "Bottom Left" },
                                  {
                                    id: "bottom-center",
                                    label: "Bottom Center",
                                  },
                                  { id: "bottom-right", label: "Bottom Right" },
                                ] as const
                              ).map((p) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => setNotifPos(p.id)}
                                  className={`px-2 py-1 rounded-lg font-medium text-center transition-all cursor-pointer text-[11px] ${
                                    notifPos === p.id
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              3. Durasi Otomatis (duration):
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {(
                                [
                                  { val: 2000, label: "2 Detik (2000ms)" },
                                  { val: 4000, label: "4 Detik (Default)" },
                                  { val: 8000, label: "8 Detik" },
                                  { val: 0, label: "Manual (Permanen)" },
                                ] as const
                              ).map((d) => (
                                <button
                                  key={d.val}
                                  type="button"
                                  onClick={() => setNotifDuration(d.val)}
                                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                    notifDuration === d.val
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {d.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                              4. Gaya Multiple Notifikasi (multiStyle):
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setNotifMultiStyle("default");
                                  notification.setMultiStyle("default");
                                }}
                                className={`px-3 py-1.5 rounded-lg font-medium text-center transition-all cursor-pointer ${
                                  notifMultiStyle === "default"
                                    ? "bg-aposis-blue-60 text-white shadow-xs font-semibold"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                Default (Daftar)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNotifMultiStyle("stacking");
                                  notification.setMultiStyle("stacking");
                                }}
                                className={`px-3 py-1.5 rounded-lg font-medium text-center transition-all cursor-pointer ${
                                  notifMultiStyle === "stacking"
                                    ? "bg-aposis-blue-60 text-white shadow-xs font-semibold"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                              >
                                Stacking (Bertumpuk)
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              {notifMultiStyle === "stacking"
                                ? "Mode Stacking: Notifikasi bertumpuk rapi seperti deck kartu, dan memanjang saat kursor di-hover."
                                : "Mode Default: Notifikasi tersusun berurutan dalam daftar vertikal."}
                            </p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                              5. Teks Judul Notifikasi (teks):
                            </label>
                            <input
                              type="text"
                              value={notifTeks}
                              onChange={(e) => setNotifTeks(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-aposis-blue-50"
                              placeholder="Contoh: Notification"
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                              6. Deskripsi / Keterangan (description):
                            </label>
                            <textarea
                              rows={2}
                              value={notifDescription}
                              onChange={(e) =>
                                setNotifDescription(e.target.value)
                              }
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-aposis-blue-50 resize-none"
                              placeholder="Contoh: Information notification message"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifHasAction}
                                onChange={(e) =>
                                  setNotifHasAction(e.target.checked)
                                }
                                className="rounded border-slate-300 text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                Aktifkan Tombol Aksi (actionTrigger)
                              </span>
                            </label>

                            {notifHasAction && (
                              <div className="pt-1 pl-6">
                                <label className="block mb-1 font-semibold text-slate-600 dark:text-slate-400">
                                  Label Aksi:
                                </label>
                                <input
                                  type="text"
                                  value={notifActionLabel}
                                  onChange={(e) =>
                                    setNotifActionLabel(e.target.value)
                                  }
                                  className="w-full px-3 py-1 text-xs bg-white border rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-aposis-blue-50"
                                  placeholder="Contoh: Action"
                                />
                              </div>
                            )}

                            <label className="flex items-center gap-2 pt-1 border-t cursor-pointer border-slate-200 dark:border-slate-700/60">
                              <input
                                type="checkbox"
                                checked={notifShowProgress}
                                onChange={(e) =>
                                  setNotifShowProgress(e.target.checked)
                                }
                                className="rounded border-slate-300 text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                Progress Bar Durasi (
                                {notifPos.startsWith("bottom")
                                  ? "di atas notifikasi"
                                  : "di bawah notifikasi"}
                                )
                              </span>
                            </label>

                            <label className="flex items-center gap-2 pt-1 border-t cursor-pointer border-slate-200 dark:border-slate-700/60">
                              <input
                                type="checkbox"
                                checked={notifCustomIcon}
                                onChange={(e) =>
                                  setNotifCustomIcon(e.target.checked)
                                }
                                className="rounded border-slate-300 text-aposis-blue-60 focus:ring-aposis-blue-50"
                              />
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                Gunakan Ikon Kustom (IconBell)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Dedicated Trigger Button & Toast Tester Area */}
                      <div className="flex flex-col items-start justify-between gap-4 p-5 border border-blue-200 rounded-xl dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 sm:flex-row sm:items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              Tombol Pengujian Notifikasi
                            </span>
                            <Badge variant="primary" size="sm">
                              Interaktif
                            </Badge>
                          </div>
                          <p className="max-w-xl text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                            Klik tombol di sebelah kanan untuk memicu notifikasi
                            mengambang dengan animasi masuk ke posisi{" "}
                            <code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1 py-0.5 rounded text-blue-800 dark:text-blue-200">
                              {notifPos}
                            </code>
                            . Progress bar durasi otomatis berada{" "}
                            <strong className="text-slate-800 dark:text-slate-200">
                              {notifPos.startsWith("bottom")
                                ? "di atas"
                                : "di bawah"}
                            </strong>{" "}
                            kartu dengan countdown yang tetap berjalan saat
                            kursor di-hover.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {/* 1 Main Testing Button */}
                          <Button
                            variant="primary"
                            size="md"
                            leftIcon={<Icon icon={IconBell} size="sm" />}
                            onClick={() => {
                              notification.show({
                                variant: notifVariant,
                                teks: notifTeks || "Notification",
                                description: notifDescription || undefined,
                                pos: notifPos,
                                duration:
                                  notifDuration === 0 ? null : notifDuration,
                                showProgress: notifShowProgress,
                                actionTrigger: notifHasAction
                                  ? {
                                      label: notifActionLabel || "Action",
                                      onClick: () =>
                                        alert(
                                          `Aksi "${notifActionLabel}" diklik!`,
                                        ),
                                    }
                                  : undefined,
                                icon: notifCustomIcon ? (
                                  <Icon
                                    icon={IconBell}
                                    size="sm"
                                    className="text-blue-500"
                                  />
                                ) : undefined,
                              });
                            }}
                            className="font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
                          >
                            Munculkan Notifikasi
                          </Button>

                          {/* Multiple Toast Tester Button */}
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => {
                              const activeDuration =
                                notifDuration === 0 ? null : notifDuration;
                              notification.info({
                                teks: "Notifikasi Pertama",
                                description: "Pesan urutan awal dalam antrian.",
                                pos: notifPos,
                                duration: activeDuration,
                                showProgress: notifShowProgress,
                              });
                              setTimeout(() => {
                                notification.success({
                                  teks: "Notifikasi Kedua",
                                  description:
                                    "Pesan kedua dengan tombol aksi.",
                                  pos: notifPos,
                                  duration: activeDuration,
                                  showProgress: notifShowProgress,
                                  actionTrigger: {
                                    label: "Lihat",
                                    onClick: () => alert("Aksi 2 diklik"),
                                  },
                                });
                              }, 200);
                              setTimeout(() => {
                                notification.warning({
                                  teks: "Notifikasi Ketiga",
                                  description: `Pesan ketiga menguji mode ${notifMultiStyle}.`,
                                  pos: notifPos,
                                  duration: activeDuration,
                                  showProgress: notifShowProgress,
                                });
                              }, 400);
                            }}
                            className="font-medium"
                          >
                            Uji 3 Notifikasi ({notifMultiStyle})
                          </Button>

                          <button
                            type="button"
                            onClick={() => notification.dismissAll()}
                            className="px-3 py-2 text-xs font-medium transition-colors rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                            title="Hapus semua toast yang sedang tampil"
                          >
                            Bersihkan Toast
                          </button>
                        </div>
                      </div>

                      {/* Live Static Preview Card */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Pratinjau Komponen Langsung (In-Place Preview):
                          </span>
                          <button
                            type="button"
                            onClick={() => setNotifPreviewKey((k) => k + 1)}
                            className="text-xs cursor-pointer text-aposis-blue-60 hover:underline"
                          >
                            Reset Pratinjau
                          </button>
                        </div>

                        <div className="p-4 bg-white border rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-950">
                          <Notification
                            key={notifPreviewKey}
                            variant={notifVariant}
                            teks={notifTeks || "Notification"}
                            description={notifDescription || undefined}
                            pos={notifPos}
                            duration={
                              notifDuration === 0 ? null : notifDuration
                            }
                            showProgress={notifShowProgress}
                            actionTrigger={
                              notifHasAction
                                ? {
                                    label: notifActionLabel || "Action",
                                    onClick: () =>
                                      alert(
                                        `Aksi "${notifActionLabel}" diklik!`,
                                      ),
                                  }
                                : undefined
                            }
                            icon={
                              notifCustomIcon ? (
                                <Icon
                                  icon={IconBell}
                                  size="sm"
                                  className="text-blue-500"
                                />
                              ) : undefined
                            }
                            onClose={() => console.log("Notification ditutup")}
                          />
                        </div>
                      </div>

                      {/* Live Reactive TSX Code */}
                      <div className="overflow-hidden border shadow-xs rounded-xl bg-slate-950 border-slate-800">
                        <div className="flex items-center justify-between px-4 py-2 font-mono text-xs border-b border-slate-800 bg-slate-900/90 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Icon
                              icon={IconCode}
                              size="sm"
                              className="text-aposis-blue-40"
                            />
                            Kode TSX:
                          </span>
                          <button
                            type="button"
                            onClick={() => copySnippet(dynamicNotificationCode)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedCode ? (
                              <Icon
                                icon={IconCheck}
                                size="sm"
                                className="text-emerald-400"
                              />
                            ) : (
                              <Icon icon={IconCopy} size="sm" />
                            )}
                            {copiedCode ? "Tersalin" : "Salin Kode"}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
                          <code>{dynamicNotificationCode}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 2. Galeri Varian Semantik */}
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Galeri Varian Notifikasi Semantik
                        </CardTitle>
                        <Badge variant="neutral" size="sm">
                          4 Varian
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        Matriks 4 varian semantik resmi (Information, Success,
                        Warning, Error) dengan garis border kiri tebal, warna
                        latar tint lembut, teks tebal, tombol aksi, dan tombol
                        tutup.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                      {/* Section A: Varian Lengkap */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Varian Lengkap (Judul & Deskripsi)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Informasi detail dengan tombol aksi
                          </span>
                        </div>

                        <div className="p-4 space-y-3 border bg-slate-50 dark:bg-slate-900/40 rounded-xl border-slate-200 dark:border-slate-800">
                          {/* 1. Info */}
                          <Notification
                            variant="info"
                            teks="Notification"
                            description="Information notification message that provides additional context and instructions for the user to follow."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Info Action diklik"),
                            }}
                          />

                          {/* 2. Success */}
                          <Notification
                            variant="success"
                            teks="Notification"
                            description="Success notification message confirming that the operation was completed safely."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Success Action diklik"),
                            }}
                          />

                          {/* 3. Warning */}
                          <Notification
                            variant="warning"
                            teks="Notification"
                            description="Warning notification message alerting the user to take precaution before proceeding."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Warning Action diklik"),
                            }}
                          />

                          {/* 4. Error */}
                          <Notification
                            variant="error"
                            teks="Notification"
                            description="Error notification message explaining the issue and offering actionable resolution steps."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Error Action diklik"),
                            }}
                          />
                        </div>
                      </div>

                      {/* Section B: Varian Ringkas */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Varian Ringkas (Hanya Judul)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Pesan ringkas satu baris
                          </span>
                        </div>

                        <div className="p-4 space-y-3 border bg-slate-50 dark:bg-slate-900/40 rounded-xl border-slate-200 dark:border-slate-800">
                          {/* 1. Info Ringkas */}
                          <Notification
                            variant="info"
                            teks="Notification: Pembaruan sistem telah selesai dimuat."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Info Action diklik"),
                            }}
                          />

                          {/* 2. Success Ringkas */}
                          <Notification
                            variant="success"
                            teks="Notification: Data nilai rapor berhasil disimpan."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Success Action diklik"),
                            }}
                          />

                          {/* 3. Warning Ringkas */}
                          <Notification
                            variant="warning"
                            teks="Notification: Sisa kuota penyimpanan server tinggal 10%."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Warning Action diklik"),
                            }}
                          />

                          {/* 4. Error Ringkas */}
                          <Notification
                            variant="error"
                            teks="Notification: Gagal menyinkronkan data ke server pusat."
                            actionTrigger={{
                              label: "Action",
                              onClick: () => alert("Error Action diklik"),
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* ORGANISMS: ACCORDION */}
            {selectedId === "accordion" && (
              <DocCard
                title="Accordion"
                badgeText="Organism"
                description="Komponen organism panel lipat (collapsible accordion) yang dapat diperluas atau disembunyikan. Dilengkapi animasi tinggi CSS grid rows yang mulus, rotasi ikon chevron 180 derajat, kontrol ukuran (sm, md, lg), batas lebar fleksibel (full, sm, md, lg, xl, atau custom), judul dan subjudul, serta penampung konten arbitrary (children)."
                snippets={accordionSnippets}
              >
                <div className="space-y-6">
                  {/* 1. Interactive Live Tester & Configurator */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-20/60">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon
                              icon={IconLayoutList}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive Accordion Tester & Configurator
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Sesuaikan opsi props di bawah untuk menguji perilaku buka-tutup, variasi ukuran, lebar, dan responsivitas Accordion.
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setAccordionSize("md");
                            setAccordionWidth("full");
                            setAccordionTitle("Title");
                            setAccordionSubtitle("");
                            setAccordionDisabled(false);
                            setAccordionPreviewKey((k) => k + 1);
                          }}
                        >
                          Reset Default
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Configuration Controls */}
                      <div className="grid grid-cols-1 gap-5 p-4 text-xs border lg:grid-cols-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border-slate-200 dark:border-slate-700/60">
                        {/* Column 1: Size & Width */}
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
                              1. Ukuran (size):
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {(["sm", "md", "lg"] as const).map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setAccordionSize(s)}
                                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                    accordionSize === s
                                      ? "bg-aposis-blue-60 text-white shadow-xs"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {s.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
                              2. Batas Lebar (width):
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {(["full", "sm", "md", "lg", "xl"] as const).map(
                                (w) => (
                                  <button
                                    key={w}
                                    type="button"
                                    onClick={() => setAccordionWidth(w)}
                                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                      accordionWidth === w
                                        ? "bg-aposis-blue-60 text-white shadow-xs"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    }`}
                                  >
                                    {w.toUpperCase()}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Title, Subtitle, Disabled */}
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                              3. Judul (title):
                            </label>
                            <input
                              type="text"
                              value={accordionTitle}
                              onChange={(e) => setAccordionTitle(e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-aposis-blue-60"
                              placeholder="Masukkan judul accordion..."
                            />
                          </div>

                          <div>
                            <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                              4. Subjudul Opsional (subtitle):
                            </label>
                            <input
                              type="text"
                              value={accordionSubtitle}
                              onChange={(e) =>
                                setAccordionSubtitle(e.target.value)
                              }
                              className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-aposis-blue-60"
                              placeholder="Kosongkan jika hanya judul utama..."
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              id="accordion-disabled-toggle"
                              type="checkbox"
                              checked={accordionDisabled}
                              onChange={(e) =>
                                setAccordionDisabled(e.target.checked)
                              }
                              className="rounded border-slate-300 text-aposis-blue-60 focus:ring-aposis-blue-60"
                            />
                            <label
                              htmlFor="accordion-disabled-toggle"
                              className="font-medium cursor-pointer select-none text-slate-700 dark:text-slate-300"
                            >
                              Nonaktifkan Interaksi (disabled)
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Live Preview Area */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Pratinjau Langsung (Klik header untuk buka/tutup)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Ukuran: {accordionSize} | Lebar: {accordionWidth}
                          </span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 border rounded-2xl bg-slate-50/60 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800">
                          <Accordion
                            key={accordionPreviewKey}
                            title={accordionTitle || "Title"}
                            subtitle={accordionSubtitle || undefined}
                            size={accordionSize}
                            width={accordionWidth}
                            disabled={accordionDisabled}
                            defaultOpen
                          >
                            <AccordionDemoContent />
                          </Accordion>
                        </div>
                      </div>

                      {/* Dynamic Code Viewer */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Kode yang Dihasilkan
                          </span>
                          <Button
                            variant="subtle"
                            size="xs"
                            leftIcon={
                              <Icon
                                icon={copiedCode ? IconCheck : IconCopy}
                                size="xs"
                              />
                            }
                            onClick={() => copySnippet(dynamicAccordionCode)}
                          >
                            {copiedCode ? "Disalin!" : "Salin Kode"}
                          </Button>
                        </div>
                        <pre className="p-4 overflow-x-auto font-mono text-xs text-slate-800 bg-slate-900 rounded-xl dark:bg-slate-950 text-slate-200">
                          <code>{dynamicAccordionCode}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 2. Standalone Showcase: Sesuai Referensi Spesifikasi */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                      <CardTitle className="text-base font-bold">
                        Tampilan Referensi Desain Resmi
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Perbandingan langsung antara kondisi tertutup (Collapsed) dan kondisi terbuka (Expanded) dengan 6 item data, badge nomor, status progress, dan label tag.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* State 1: Collapsed / Tertutup */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                          Kondisi 1: Tertutup (Collapsed)
                        </span>
                        <Accordion title="Title" defaultOpen={false}>
                          <AccordionDemoContent />
                        </Accordion>
                      </div>

                      {/* State 2: Expanded / Terbuka */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                          Kondisi 2: Terbuka (Expanded)
                        </span>
                        <Accordion title="Title" defaultOpen={true}>
                          <AccordionDemoContent />
                        </Accordion>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 3. Standalone Showcase: Variasi Ukuran (sm, md, lg) */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                      <CardTitle className="text-base font-bold">
                        Variasi Ukuran (Size sm, md, lg)
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Pilihan skala ukuran untuk menyesuaikan hierarki konten pada layout dashboard atau modal.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      {/* Size Small */}
                      <Accordion
                        size="sm"
                        title="Accordion Ukuran Small (sm)"
                        subtitle="Padding ringkas dan font lebih kecil untuk panel padat"
                      >
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                          Konten accordion small cocok untuk sidebar, panel filter, atau card ringkas dengan ruang terbatas.
                        </p>
                      </Accordion>

                      {/* Size Medium (Default) */}
                      <Accordion
                        size="md"
                        title="Accordion Ukuran Medium (md)"
                        subtitle="Ukuran standar ideal untuk sebagian besar modul web"
                        defaultOpen
                      >
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          Konten accordion medium memberikan kenyamanan membaca dengan proporsi padding dan tipografi seimbang.
                        </p>
                      </Accordion>

                      {/* Size Large */}
                      <Accordion
                        size="lg"
                        title="Accordion Ukuran Large (lg)"
                        subtitle="Pilihan utama untuk bagian penting, FAQ, atau halaman berfokus tinggi"
                      >
                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                          Konten accordion large menampilkan judul yang tegas dengan ruang napas lebih lega di setiap sisinya.
                        </p>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* ORGANISMS: NAVBAR */}
            {selectedId === "navbar" && (
              <DocCard
                title="Navbar"
                badgeText="Organism"
                description="Header aplikasi komprehensif dengan logo brand, menu navigasi, notifikasi, dan profil pengguna."
                usageSnippet={`import { Navbar } from '@aposis/design-system';\n\n<Navbar brandName="Aposis Portal" user={{ name: 'Admin', email: 'admin@aposis.id' }} />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="p-0 overflow-hidden border-t border-slate-100 dark:border-slate-800 rounded-b-2xl">
                    <Navbar
                      brandName="Aposis Portal"
                      navLinks={[
                        { id: "1", label: "Dashboard", active: true },
                        { id: "2", label: "Siswa" },
                        { id: "3", label: "Laporan" },
                      ]}
                      user={{ name: "Admin User", email: "admin@aposis.id" }}
                      notificationCount={2}
                      actions={
                        <Button size="sm" variant="outline">
                          Bantuan
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* ORGANISMS: SIDEBAR */}
            {selectedId === "sidebar" && (
              <DocCard
                title="Sidebar"
                badgeText="Organism"
                description="Menu samping vertikal aplikasi dengan dukungan grouping link, badge counter, dan mode collapse."
                usageSnippet={`import { Sidebar } from '@aposis/design-system';\n\n<Sidebar groups={sidebarGroups} collapsed={isCollapsed} />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSidebarDemoCollapsed(!sidebarDemoCollapsed)
                        }
                      >
                        {sidebarDemoCollapsed
                          ? "Expand Sidebar"
                          : "Collapse Sidebar"}
                      </Button>
                    </div>
                    <div className="flex overflow-hidden border h-80 rounded-2xl border-slate-700">
                      <Sidebar
                        groups={sidebarNavGroups.slice(1, 3).map((g) => ({
                          title: g.title,
                          items: g.items.map((i) => ({
                            id: i.id,
                            label: i.label,
                            icon: <Icon icon={i.icon} size="sm" />,
                          })),
                        }))}
                        collapsed={sidebarDemoCollapsed}
                        header={
                          <div className="text-xs font-bold text-white">
                            Aposis Menu
                          </div>
                        }
                      />
                      <div className="flex items-center justify-center flex-1 p-4 text-xs bg-slate-100 dark:bg-slate-800 text-slate-400">
                        Workspace Area
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* ORGANISMS: STAT CARD */}
            {selectedId === "stat-card" && (
              <DocCard
                title="StatCard"
                badgeText="Organism"
                description="Kartu metrik statistik dashboard dengan indikator persentase kenaikan/penurunan (trend up/down)."
                usageSnippet={`import { StatCard } from '@aposis/design-system';\n\n<StatCard title="Total Siswa" value="12,840" change={{ value: '+14%', trend: 'up' }} />`}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <StatCard
                    title="Total Siswa Aktif"
                    value="12,840"
                    change={{
                      value: "+14.2%",
                      trend: "up",
                      label: "vs bulan lalu",
                    }}
                    icon={
                      <Icon
                        icon={IconUsers}
                        size="md"
                        className="text-aposis-blue-60"
                      />
                    }
                  />
                  <StatCard
                    title="Tingkat Akurasi"
                    value="99.4%"
                    change={{ value: "Stabil", trend: "neutral" }}
                    icon={
                      <Icon
                        icon={IconSparkles}
                        size="md"
                        className="text-purple-600"
                      />
                    }
                    iconBg="bg-purple-50 dark:bg-purple-950/40"
                  />
                </div>
              </DocCard>
            )}

            {/* ORGANISMS: DATA TABLE */}
            {selectedId === "data-table" && (
              <DocCard
                title="DataTable"
                badgeText="Organism"
                description="Organism tabel data komprehensif dan modular. Dilengkapi judul dan deskripsi, toolbar dengan input pencarian dan tombol aksi, seleksi baris checkbox (termasuk select-all dan status indeterminate), baris expandable dengan rotasi chevron mulus 180 derajat, sorting kolom, serta navigasi paginasi cerdas berangka."
                snippets={dataTableSnippets}
              >
                <div className="space-y-8">
                  {/* 1. Interactive Live Tester & Configurator */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-20/60">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon
                              icon={IconTable}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive DataTable Tester & Configurator
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Uji coba berbagai fitur interaktif tabel: seleksi checkbox, ekspansi baris, pencarian teks, tombol aksi toolbar, status loading, dan paginasi.
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setDtTitle("Title");
                            setDtDescription("Description");
                            setDtSearchable(true);
                            setDtSelectable(true);
                            setDtExpandable(true);
                            setDtHasToolbarActions(true);
                            setDtHasPagination(true);
                            setDtIsLoading(false);
                            setDtIsEmpty(false);
                            setDtPage(1);
                            setDtSelectedRows([]);
                            setDtExpandedRows([]);
                          }}
                        >
                          Reset Default
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Controls Grid */}
                      <div className="grid grid-cols-1 gap-5 p-4 text-xs border lg:grid-cols-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border-slate-200 dark:border-slate-700/60">
                        {/* Column 1: Feature Toggles */}
                        <div className="space-y-3">
                          <span className="block font-semibold text-slate-700 dark:text-slate-300">
                            Fitur & Opsi Interaksi:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtSearchable}
                                onChange={(e) => setDtSearchable(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Pencarian (searchable)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtSelectable}
                                onChange={(e) => setDtSelectable(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Seleksi Baris (selectable)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtExpandable}
                                onChange={(e) => setDtExpandable(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Baris Lipat (expandable)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtHasToolbarActions}
                                onChange={(e) => setDtHasToolbarActions(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Aksi Toolbar (action buttons)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtHasPagination}
                                onChange={(e) => setDtHasPagination(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Paginasi (pagination)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtIsLoading}
                                onChange={(e) => setDtIsLoading(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Simulasi Loading</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={dtIsEmpty}
                                onChange={(e) => setDtIsEmpty(e.target.checked)}
                                className="w-4 h-4 rounded text-aposis-blue-60 focus:ring-aposis-blue-60"
                              />
                              <span>Simulasi Data Kosong</span>
                            </label>
                          </div>
                        </div>

                        {/* Column 2: Titles & Text Customization */}
                        <div className="space-y-3">
                          <span className="block font-semibold text-slate-700 dark:text-slate-300">
                            Teks Judul & Deskripsi:
                          </span>
                          <div>
                            <label className="block mb-1 text-slate-600 dark:text-slate-400">
                              Judul Header (title):
                            </label>
                            <input
                              type="text"
                              value={dtTitle}
                              onChange={(e) => setDtTitle(e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-aposis-blue-60"
                              placeholder="Masukkan judul..."
                            />
                          </div>
                          <div>
                            <label className="block mb-1 text-slate-600 dark:text-slate-400">
                              Deskripsi Header (description):
                            </label>
                            <input
                              type="text"
                              value={dtDescription}
                              onChange={(e) => setDtDescription(e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-aposis-blue-60"
                              placeholder="Masukkan deskripsi..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Live Preview & Status Bar */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-xs">
                          <div className="flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-300">
                            <span className="font-semibold text-slate-800 dark:text-slate-100">Status Live:</span>
                            {dtSelectable && (
                              <Badge variant="primary" appearance="subtle" size="sm">
                                {dtSelectedRows.length} dari {figmaMockData.length} baris dipilih
                              </Badge>
                            )}
                            {dtExpandable && (
                              <Badge variant="neutral" appearance="subtle" size="sm">
                                {dtExpandedRows.length} baris terbuka
                              </Badge>
                            )}
                            {dtHasPagination && (
                              <span className="text-slate-500">Halaman {dtPage} dari 30</span>
                            )}
                          </div>
                          {dtSelectable && dtSelectedRows.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setDtSelectedRows([])}
                              className="text-xs font-medium cursor-pointer text-aposis-blue-60 hover:underline"
                            >
                              Reset Seleksi
                            </button>
                          )}
                        </div>

                        <div className="p-1 border sm:p-2 bg-slate-50/60 dark:bg-slate-950/40 rounded-2xl border-slate-200/80 dark:border-slate-800">
                          <DataTable
                            title={dtTitle || undefined}
                            description={dtDescription || undefined}
                            columns={figmaColumns}
                            data={dtIsEmpty ? [] : figmaMockData}
                            keyExtractor={(item) => item.id}
                            searchable={dtSearchable}
                            searchPlaceholder="Search input text"
                            selectable={dtSelectable}
                            selectedRowKeys={dtSelectedRows}
                            onSelectionChange={(keys) => setDtSelectedRows(keys)}
                            expandable={dtExpandable}
                            expandedRowKeys={dtExpandedRows}
                            onExpandRow={(key, isExp) => {
                              setDtExpandedRows((prev) =>
                                isExp ? [...prev, key] : prev.filter((k) => k !== key)
                              );
                            }}
                            expandedRowRender={(row) => (
                              <div className="p-4 border rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/60">
                                <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                    Informasi Detail Baris #{row.id}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="primary" appearance="subtle" size="sm">
                                      Tervalidasi
                                    </Badge>
                                    <span className="text-xs text-slate-400">Kode: TRX-{row.id}092</span>
                                  </div>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                  Sub-baris ini mendukung elemen arbitrary apapun: ringkasan statistik, form inline cepat, sub-tabel child data, maupun jejak audit komprehensif.
                                </p>
                              </div>
                            )}
                            showDefaultSecondaryActions={dtHasToolbarActions}
                            primaryAction={
                              dtHasToolbarActions
                                ? {
                                    label: "Button +",
                                    onClick: () => {
                                      notification.info({
                                        teks: "Aksi Tombol Utama",
                                        description: "Tombol 'Button +' diklik.",
                                      });
                                    },
                                  }
                                : undefined
                            }
                            isLoading={dtIsLoading}
                            pagination={
                              dtHasPagination
                                ? {
                                    currentPage: dtPage,
                                    totalPages: 30,
                                    totalItems: 150,
                                    onPageChange: (p) => setDtPage(p),
                                  }
                                : undefined
                            }
                          />
                        </div>
                      </div>

                      {/* Generated Code Preview */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Generated JSX Code:
                          </label>
                          <Button
                            size="xs"
                            variant="ghost"
                            leftIcon={
                              <Icon
                                icon={copiedCode ? IconCheck : IconCopy}
                                size="xs"
                                className={copiedCode ? "text-green-500" : ""}
                              />
                            }
                            onClick={() => copySnippet(dynamicDataTableCode)}
                          >
                            {copiedCode ? "Tersalin!" : "Salin Kode"}
                          </Button>
                        </div>
                        <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed border text-slate-100 bg-slate-900 dark:bg-slate-950 rounded-xl border-slate-800 max-h-56">
                          {dynamicDataTableCode}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 2. Standalone Variations Showcases */}
                  <div className="space-y-6">
                    <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        Variasi Mode Tabel (Standar Desain Referensi)
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Representasi 4 variasi mode tampilan tabel sesuai spesifikasi desain sistem: standar, expandable, selectable, dan kombinasi keduanya.
                      </p>
                    </div>

                    {/* Mode 1: Standard Table */}
                    <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Mode 1: Standard Plain Table
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Tabel data standar dengan 10 kolom Header, 1 kolom aksi, toolbar pencarian, dan paginasi angka.
                            </CardDescription>
                          </div>
                          <Badge variant="neutral" appearance="subtle" size="sm">
                            Default Mode
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <DataTable
                          title="Title"
                          description="Description"
                          columns={figmaColumns}
                          data={figmaMockData}
                          keyExtractor={(item) => item.id}
                          searchable
                          searchPlaceholder="Search input text"
                          showDefaultSecondaryActions
                          primaryAction={{
                            label: "Button +",
                            onClick: () => {
                              notification.info({
                                teks: "Button +",
                                description: "Tombol aksi tambah diklik.",
                              });
                            },
                          }}
                          pagination={{
                            currentPage: showcase1Page,
                            totalPages: 30,
                            totalItems: 150,
                            onPageChange: (p) => setShowcase1Page(p),
                          }}
                        />
                      </CardContent>
                    </Card>

                    {/* Mode 2: Expandable Rows Table */}
                    <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Mode 2: Expandable Rows Table
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Mendukung tombol chevron lipat pada setiap baris dengan transisi rotasi 180 derajat untuk menampilkan sub-baris detail.
                            </CardDescription>
                          </div>
                          <Badge variant="primary" appearance="subtle" size="sm">
                            Expandable
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <DataTable
                          title="Title"
                          description="Description"
                          columns={figmaColumns}
                          data={figmaMockData}
                          keyExtractor={(item) => item.id}
                          searchable
                          searchPlaceholder="Search input text"
                          expandable
                          expandedRowKeys={showcase2Expanded}
                          onExpandRow={(key, isExp) => {
                            setShowcase2Expanded((prev) =>
                              isExp ? [...prev, key] : prev.filter((k) => k !== key)
                            );
                          }}
                          expandedRowRender={(row) => (
                            <div className="p-4 border rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/60">
                              <div className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                                Detail Baris #{row.id}
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300">
                                Informasi lanjutan atau sub-komponen terstruktur yang terkait langsung dengan rekaman baris ini.
                              </p>
                            </div>
                          )}
                          showDefaultSecondaryActions
                          primaryAction={{
                            label: "Button +",
                            onClick: () => {
                              notification.info({
                                teks: "Button +",
                                description: "Tombol aksi tambah diklik.",
                              });
                            },
                          }}
                          pagination={{
                            currentPage: showcase2Page,
                            totalPages: 30,
                            totalItems: 150,
                            onPageChange: (p) => setShowcase2Page(p),
                          }}
                        />
                      </CardContent>
                    </Card>

                    {/* Mode 3: Selectable Rows Table */}
                    <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Mode 3: Selectable Rows Table
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Checkbox di setiap baris dan select-all checkbox di header tabel yang secara otomatis menangani status indeterminate saat sebagian baris dipilih.
                            </CardDescription>
                          </div>
                          <Badge variant="success" appearance="subtle" size="sm">
                            Selectable
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <DataTable
                          title="Title"
                          description="Description"
                          columns={figmaColumns}
                          data={figmaMockData}
                          keyExtractor={(item) => item.id}
                          searchable
                          searchPlaceholder="Search input text"
                          selectable
                          selectedRowKeys={showcase3Selected}
                          onSelectionChange={(keys) => setShowcase3Selected(keys)}
                          showDefaultSecondaryActions
                          primaryAction={{
                            label: "Button +",
                            onClick: () => {
                              notification.info({
                                teks: "Button +",
                                description: `Tombol aksi diklik dengan ${showcase3Selected.length} baris terpilih.`,
                              });
                            },
                          }}
                          pagination={{
                            currentPage: showcase3Page,
                            totalPages: 30,
                            totalItems: 150,
                            onPageChange: (p) => setShowcase3Page(p),
                          }}
                        />
                      </CardContent>
                    </Card>

                    {/* Mode 4: Combined Expandable & Selectable Table */}
                    <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Mode 4: Combined Expandable & Selectable Table
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Kombinasi lengkap kolom chevron expander dan checkbox multi-seleksi yang beroperasi secara serentak tanpa konflik interaksi.
                            </CardDescription>
                          </div>
                          <Badge variant="primary" appearance="subtle" size="sm">
                            Full Features
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <DataTable
                          title="Title"
                          description="Description"
                          columns={figmaColumns}
                          data={figmaMockData}
                          keyExtractor={(item) => item.id}
                          searchable
                          searchPlaceholder="Search input text"
                          selectable
                          selectedRowKeys={showcase4Selected}
                          onSelectionChange={(keys) => setShowcase4Selected(keys)}
                          expandable
                          expandedRowKeys={showcase4Expanded}
                          onExpandRow={(key, isExp) => {
                            setShowcase4Expanded((prev) =>
                              isExp ? [...prev, key] : prev.filter((k) => k !== key)
                            );
                          }}
                          expandedRowRender={(row) => (
                            <div className="p-4 border rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/60">
                              <div className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                                Data Rinci Baris #{row.id}
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300">
                                Kolom chevron dan checkbox berjalan berdampingan secara mandiri. Memilih checkbox tidak akan memicu trigger ekspansi baris.
                              </p>
                            </div>
                          )}
                          showDefaultSecondaryActions
                          primaryAction={{
                            label: "Button +",
                            onClick: () => {
                              notification.info({
                                teks: "Button +",
                                description: "Tombol aksi pada mode kombinasi diklik.",
                              });
                            },
                          }}
                          pagination={{
                            currentPage: showcase4Page,
                            totalPages: 30,
                            totalItems: 150,
                            onPageChange: (p) => setShowcase4Page(p),
                          }}
                        />
                      </CardContent>
                    </Card>

                    {/* Mode 5: Real-World Academic Student Table */}
                    <Card className="shadow-xs dark:bg-slate-900 dark:border-slate-800">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Contoh Nyata: Data Master Siswa
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Penerapan dalam sistem akademik sekolah dengan avatar siswa, status kelulusan, nilai IPK rata-rata, dan paginasi.
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" appearance="subtle" size="sm">
                            Kasus Riil
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <DataTable
                          title="Daftar Siswa Aktif"
                          description="Data kesiswaan tahun akademik 2025/2026 semester ganjil."
                          columns={studentColumns}
                          data={mockStudents}
                          keyExtractor={(item) => item.id}
                          searchable
                          searchPlaceholder="Cari siswa berdasarkan nama atau NISN..."
                          primaryAction={{
                            label: "Tambah Siswa +",
                            onClick: () => {
                              notification.success({
                                teks: "Tambah Siswa",
                                description: "Modal formulir pendaftaran siswa baru akan dibuka.",
                              });
                            },
                          }}
                          pagination={{
                            currentPage: tablePage,
                            totalPages: 5,
                            totalItems: 48,
                            onPageChange: setTablePage,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </DocCard>
            )}

            {/* ORGANISMS: CARD */}
            {selectedId === "card" && (
              <DocCard
                title="Card"
                badgeText="Organism"
                description="Kontainer kartu modular dengan CardHeader, CardTitle, CardDescription, CardContent, dan CardFooter."
                usageSnippet={`import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@aposis/design-system';\n\n<Card>\n  <CardHeader><CardTitle>Judul</CardTitle></CardHeader>\n  <CardContent>Konten...</CardContent>\n</Card>`}
              >
                <Card
                  hoverable
                  className="max-w-md dark:bg-slate-900 dark:border-slate-800"
                >
                  <CardHeader>
                    <CardTitle>Judul Kartu</CardTitle>
                    <CardDescription>
                      Deskripsi singkat kartu untuk menjelaskan isinya.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body" className="dark:text-slate-300">
                      Ini adalah contoh isi dari komponen{" "}
                      <code>CardContent</code>. Sangat fleksibel dan dapat diisi
                      elemen apapun.
                    </Text>
                  </CardContent>
                  <CardFooter className="dark:bg-slate-850 dark:border-slate-800">
                    <span className="text-xs text-slate-400">
                      Status: Tersimpan
                    </span>
                    <Button size="sm">Aksi Kartu</Button>
                  </CardFooter>
                </Card>
              </DocCard>
            )}
            
            {/* ORGANISMS: PROGRESS INDICATOR */}
            {selectedId === "progress-indicator" && (
              <DocCard
                title="Progress Indicator"
                badgeText="Organism"
                description="Komponen indikator alur/langkah pengerjaan multi-step (stepper). Mendukung visualisasi kondisi Completed (centang), Current (nomor aktif), dan Upcoming, beserta garis penghubung otomatis."
                snippets={progressIndicatorSnippets}
              >
                <div className="space-y-6">
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-20/60">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            Interactive Progress Indicator Configurator
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Klik tombol Navigasi di bawah atau klik langsung lingkaran step untuk berpindah alur.
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={activeStepIndex === 0}
                            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                          >
                            Sebelumnya
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={activeStepIndex === 2}
                            onClick={() => setActiveStepIndex((prev) => Math.min(2, prev + 1))}
                          >
                            Selanjutnya
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-8 pb-10 space-y-8">
                      {/* Live Preview 3 Steps */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Contoh 3 Langkah (Default)
                        </span>
                        <div className="p-6 bg-white border rounded-2xl dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                          <ProgressIndicator
                            steps={sampleProgressSteps}
                            currentStep={activeStepIndex}
                            onStepClick={(index) => setActiveStepIndex(index)}
                          />
                        </div>
                      </div>

                      {/* Live Preview 5 Steps */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Contoh 5 Langkah
                        </span>
                        <div className="p-6 bg-white border rounded-2xl dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                          <ProgressIndicator
                            steps={[
                              { label: 'Step 1' },
                              { label: 'Step 2' },
                              { label: 'Step 3' },
                              { label: 'Step 4' },
                              { label: 'Step 5' },
                            ]}
                            currentStep={activeStepIndex}
                            onStepClick={(index) => setActiveStepIndex(index)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* TOKENS: PRIMITIVE PALETTES */}
            {selectedId === "palettes" && (
              <DocCard
                title="Primitive Token Palettes"
                badgeText="Token"
                description="7 palet warna primitif (Green, Cyan, Rose, Amber, Blue, Violet, Slate) dalam 10 tingkatan intensitas (10-100) dari Figma Aposis."
                usageSnippet={`// Menggunakan Tailwind class:\n<div className="text-white bg-aposis-blue-60" />\n\n// Atau JavaScript tokens:\nimport { primitiveColors } from '@aposis/design-system/tokens';`}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {paletteCards.map((pal) => (
                    <div
                      key={pal.key}
                      className="p-4 space-y-2 bg-white border rounded-2xl dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-bold">{pal.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          10 - 100
                        </span>
                      </div>
                      <div className="space-y-1 font-mono text-xs">
                        {Object.entries(pal.color).map(([level, hex]) => (
                          <div
                            key={level}
                            className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            <span className="font-sans capitalize text-slate-600 dark:text-slate-400">
                              {pal.key} {level}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-[11px]">
                                {hex}
                              </span>
                              <span
                                className="inline-block w-4 h-4 border rounded-full border-black/10 shadow-2xs"
                                style={{ backgroundColor: hex }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DocCard>
            )}
            
            {/* ORGANISMS/MOLECULES: CHART HEADER */}
            {selectedId === "chart-header" && (
              <DocCard
                title="Chart Header"
                badgeText="Organism"
                description="Komponen header grafik interaktif yang mendukung switcher tipe chart (Bar, Treemap, Pie, Sankey), tag filter aktif, serta tombol aksi cepat seperti Filter, Table View, Fullscreen, dan More Options."
                snippets={chartHeaderSnippets}
              >
                <div className="space-y-6">
                  {/* 1. Interactive Live Tester & Configurator */}
                  <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800 border-aposis-blue-20/60">
                    <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon
                              icon={IconLayoutList}
                              size="sm"
                              className="text-aposis-blue-60"
                            />
                            Interactive Chart Header Configurator
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs">
                            Ubah parameter di bawah untuk menguji pergantian jenis chart, teks judul, dan tombol aksi.
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setChartHeaderTitle("Chart title");
                            setChartHeaderSubtitle("Chart title");
                            setActiveChartType("bar");
                            setActiveTags(["Tag"]);
                          }}
                        >
                          Reset Default
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                      {/* Controls Input */}
                      <div className="grid grid-cols-1 gap-4 p-4 text-xs border bg-slate-50 dark:bg-slate-800/40 rounded-xl border-slate-200 dark:border-slate-700/60 sm:grid-cols-2">
                        <div>
                          <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                            Judul Chart:
                          </label>
                          <input
                            type="text"
                            value={chartHeaderTitle}
                            onChange={(e) => setChartHeaderTitle(e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-aposis-blue-60"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                            Subjudul Chart:
                          </label>
                          <input
                            type="text"
                            value={chartHeaderSubtitle}
                            onChange={(e) => setChartHeaderSubtitle(e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-aposis-blue-60"
                          />
                        </div>
                      </div>

                      {/* Live Preview Area */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Pratinjau Langsung
                        </span>
                        <div className="p-4 bg-white border rounded-2xl dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                          <ChartHeader
                            title={chartHeaderTitle}
                            subtitle={chartHeaderSubtitle}
                            activeChartType={activeChartType}
                            onChartTypeChange={(id) => setActiveChartType(id)}
                            activeTags={activeTags}
                            onRemoveTag={(tagToRemove) =>
                              setActiveTags(activeTags.filter((t) => t !== tagToRemove))
                            }
                            onFilterClick={() => alert("Filter Clicked")}
                            onTableClick={() => alert("Table View Clicked")}
                            onExpandClick={() => alert("Expand Clicked")}
                            onMoreClick={() => alert("More Option Clicked")}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* TOKENS: TEXT SEMANTICS */}
            {selectedId === "text-semantics" && (
              <DocCard
                title="Text Semantic Colors"
                badgeText="Token"
                description="Token semantik teks dengan penyesuaian otomatis untuk Light Mode dan Dark Mode."
                usageSnippet={`<span className="text-text-primary" />\n<span className="text-text-interactive hover:text-text-interactive-hover" />`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="font-semibold uppercase border-b border-slate-200 dark:border-slate-700 text-slate-400">
                            <th className="py-2.5 px-3">Name</th>
                            <th className="py-2.5 px-3">Value</th>
                            <th className="py-2.5 px-3 text-center">
                              Light / Dark
                            </th>
                            <th className="py-2.5 px-3">Live Preview</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono divide-y divide-slate-100 dark:divide-slate-800">
                          {semanticTextRows.map((r) => (
                            <tr
                              key={r.name}
                              className="hover:bg-slate-50 dark:hover:bg-slate-850"
                            >
                              <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                                {r.name}
                              </td>
                              <td className="py-2.5 px-3 text-slate-500 font-sans">
                                {r.value}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <span
                                  className="w-3.5 h-3.5 rounded-full inline-block mr-1 shadow-2xs"
                                  style={{ backgroundColor: r.light }}
                                />
                                <span
                                  className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs"
                                  style={{ backgroundColor: r.dark }}
                                />
                              </td>
                              <td
                                className="py-2.5 px-3 font-sans font-medium"
                                style={{ color: isDarkMode ? r.dark : r.light }}
                              >
                                Teks Contoh
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* TOKENS: BG & SURFACE SEMANTICS */}
            {selectedId === "bg-surface-semantics" && (
              <DocCard
                title="Background & Surface Semantic Colors"
                badgeText="Token"
                description="Warna latar belakang untuk kanvas, halaman, field input, serta kontainer permukaan (surface)."
                usageSnippet={`<div className="bg-background-default text-text-primary" />\n<div className="border bg-surface-field border-border-card" />`}
              >
                <div className="space-y-6">
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Background Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="uppercase border-b border-slate-200 dark:border-slate-700 text-slate-400">
                              <th className="px-3 py-2">Name</th>
                              <th className="px-3 py-2">Value</th>
                              <th className="px-3 py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {backgroundRows.map((r) => (
                              <tr key={r.name}>
                                <td className="px-3 py-2 font-mono font-semibold">
                                  {r.name}
                                </td>
                                <td className="px-3 py-2 text-slate-400">
                                  {r.val}
                                </td>
                                <td className="px-3 py-2">{r.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Surface Colors (Sampel)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="uppercase border-b border-slate-200 dark:border-slate-700 text-slate-400">
                              <th className="px-3 py-2">Name</th>
                              <th className="px-3 py-2">Value</th>
                              <th className="px-3 py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {surfaceRows.map((r) => (
                              <tr key={r.name}>
                                <td className="px-3 py-2 font-mono font-semibold">
                                  {r.name}
                                </td>
                                <td className="px-3 py-2 text-slate-400">
                                  {r.val}
                                </td>
                                <td className="px-3 py-2">{r.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* TOKENS: LAYER & ELEVATION */}
            {selectedId === "layer-elevation" && (
              <DocCard
                title="Layer & Elevation Semantic Colors"
                badgeText="Token"
                description="Spesifikasi warna lapisan interaktif dan tingkatan elevasi bayangan (shadow) komponen."
                usageSnippet={`<div className="bg-layer hover:bg-layer-hover" />\n<div className="shadow-elevation-high" />`}
              >
                <div className="space-y-6">
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Elevation Shadows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {elevationRows.map((r) => (
                          <div
                            key={r.name}
                            className={`p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${
                              r.name === "elevation-high"
                                ? "shadow-elevation-high"
                                : r.name === "elevation-medium"
                                  ? "shadow-elevation-medium"
                                  : "shadow-elevation-low"
                            }`}
                          >
                            <div className="font-mono text-xs font-bold text-aposis-blue-60">
                              {r.name}
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                              {r.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Layer Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="uppercase border-b border-slate-200 dark:border-slate-700 text-slate-400">
                              <th className="px-3 py-2">Name</th>
                              <th className="px-3 py-2">Value</th>
                              <th className="px-3 py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {layerRows.map((r) => (
                              <tr key={r.name}>
                                <td className="px-3 py-2 font-mono font-semibold">
                                  {r.name}
                                </td>
                                <td className="px-3 py-2 text-slate-400">
                                  {r.val}
                                </td>
                                <td className="px-3 py-2">{r.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* TOKENS: ICON & BORDER SEMANTICS */}
            {selectedId === "icon-border-semantics" && (
              <DocCard
                title="Icon & Border Semantic Colors"
                badgeText="Token"
                description="Warna semantik untuk ikon antarmuka dan garis tepi (border) pembatas komponen."
                usageSnippet={`<Icon icon={IconSearch} className="text-icon-interactive" />\n<div className="border border-border-card hover:border-border-card-hover" />`}
              >
                <div className="space-y-6">
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Icon Semantic Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="uppercase border-b border-slate-200 dark:border-slate-700 text-slate-400">
                              <th className="px-3 py-2">Name</th>
                              <th className="px-3 py-2">Value</th>
                              <th className="px-3 py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {iconSemanticRows.map((r) => (
                              <tr key={r.name}>
                                <td className="px-3 py-2 font-mono font-semibold">
                                  {r.name}
                                </td>
                                <td className="px-3 py-2 text-slate-400">
                                  {r.val}
                                </td>
                                <td className="px-3 py-2">{r.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>Border Semantic Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="uppercase border-b border-slate-200 dark:border-slate-700 text-slate-400">
                              <th className="px-3 py-2">Name</th>
                              <th className="px-3 py-2">Value</th>
                              <th className="px-3 py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {borderSemanticRows.map((r) => (
                              <tr key={r.name}>
                                <td className="px-3 py-2 font-mono font-semibold">
                                  {r.name}
                                </td>
                                <td className="px-3 py-2 text-slate-400">
                                  {r.val}
                                </td>
                                <td className="px-3 py-2">{r.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}

            {/* TOKENS: TYPOGRAPHY SCALE */}
            {selectedId === "typography-scale" && (
              <DocCard
                title="Typography v3.1 (Lexend)"
                badgeText="Token"
                description="Skala tipografi resmi berbasis font Lexend yang dirancang khusus untuk Desktop dan Mobile."
                usageSnippet={`import { Heading, Text } from '@aposis/design-system';\n\n<Heading variant="h1">Section H1</Heading>\n<Text variant="body-lg">Body Text</Text>`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-1">
                      <Heading variant="display">Display Title</Heading>
                      <div className="text-[11px] text-slate-400">
                        Display • 60px / 3.75rem • weight 300 • line-height 1.1
                        • tracking -0.02em
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Heading variant="h1">Section H1</Heading>
                      <div className="text-[11px] text-slate-400">
                        H1 • 48px / 3rem • weight 500 • line-height 1.15 •
                        tracking -0.02em
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Heading variant="h2">Section H2</Heading>
                      <div className="text-[11px] text-slate-400">
                        H2 • 36px / 2.25rem • weight 500 • line-height 1.2 •
                        tracking -0.01em
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Heading variant="h3">Section H3</Heading>
                      <div className="text-[11px] text-slate-400">
                        H3 • 30px / 1.875rem • weight 500 • line-height 1.25 •
                        tracking -0.01em
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Heading variant="h4">Section H4</Heading>
                      <div className="text-[11px] text-slate-400">
                        H4 • 24px / 1.5rem • weight 500 • line-height 1.3 •
                        tracking 0
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Heading variant="h5">Section H5</Heading>
                      <div className="text-[11px] text-slate-400">
                        H5 • 20px / 1.25rem • weight 500 • line-height 1.4 •
                        tracking 0
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Heading variant="title">Title</Heading>
                      <div className="text-[11px] text-slate-400">
                        Title • 18px / 1.125rem • weight 500 • line-height 1.4 •
                        tracking 0
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Text variant="body-lg">Body Large</Text>
                      <div className="text-[11px] text-slate-400">
                        Body-lg • 16px / 1rem • weight 400 • line-height 1.3 •
                        tracking 0
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Text variant="subtitle">Subtitle</Text>
                      <div className="text-[11px] text-slate-400">
                        Subtitle • 14px / 0.875rem • weight 600 • line-height
                        1.3 • tracking 0
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Text variant="body">Body Regular</Text>
                      <div className="text-[11px] text-slate-400">
                        Body • 14px / 0.875rem • weight 400 • line-height 1.3 •
                        tracking 0
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Text variant="caption">Helper Text, Caption</Text>
                      <div className="text-[11px] text-slate-400">
                        Caption • 12px / 0.75rem • weight 400 • line-height 1.5
                        • tracking 0.01em
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Text variant="overline">Overline Text</Text>
                      <div className="text-[11px] text-slate-400">
                        Overline • 11px / 0.6875rem • weight 600 • line-height
                        1.3 • tracking 0.06em
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* TOKENS: UNIT SCALE */}
            {selectedId === "unit-scale" && (
              <DocCard
                title="Unit Scale v3.1"
                badgeText="Token"
                description="Daftar konversi jarak resmi dari satuan pixel ke rem (1px s/d 144px) dari Figma."
                usageSnippet={`import { units } from '@aposis/design-system/tokens';\n\n// Tailwind spacing utility: p-16px (1rem), m-24px (1.5rem), dsb.`}
              >
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                      {Object.entries(units).map(([px, rem]) => (
                        <div
                          key={px}
                          className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 px-2"
                        >
                          <span className="text-xs font-semibold text-slate-500">
                            {px}
                          </span>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-1.5 bg-aposis-blue-60/30 rounded"
                              style={{
                                width: `${Math.min(parseFloat(px) * 1.5, 60)}px`,
                              }}
                            />
                            <span className="w-20 font-mono text-xs font-bold text-right">
                              {rem}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </DocCard>
            )}

            {/* PANDUAN: MICROSERVICES INTEGRATION */}
            {selectedId === "microservices" && (
              <DocCard
                title="Integrasi di Repositori Microservices"
                badgeText="Guide"
                description="Langkah-langkah memasang dan mengimpor @aposis/design-system di proyek frontend lain (aposis-fe-v2, dashboard, cms, dll)."
                usageSnippet={`npm install @aposis/design-system`}
              >
                <div className="space-y-6">
                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>1. Instalasi Package</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="p-4 overflow-x-auto font-mono text-xs bg-slate-900 text-sky-300 rounded-xl">
                        npm install @aposis/design-system
                      </pre>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>
                        2. Opsi A: Integrasi Tailwind Preset (Direkomendasikan)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="p-4 overflow-x-auto font-mono text-xs bg-slate-900 text-emerald-300 rounded-xl">
                        {`// tailwind.config.js di repo Anda
import aposisPreset from '@aposis/design-system/tailwind.preset';

export default {
  presets: [aposisPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@aposis/design-system/**/*.{js,mjs}'
  ],
};`}
                      </pre>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>
                        3. Opsi B: Standalone Precompiled CSS
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="p-4 overflow-x-auto font-mono text-xs text-purple-300 bg-slate-900 rounded-xl">
                        {`// src/main.tsx atau App.tsx
import '@aposis/design-system/style.css';`}
                      </pre>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader>
                      <CardTitle>4. Contoh Impor Komponen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="p-4 overflow-x-auto font-mono text-xs bg-slate-900 text-amber-200 rounded-xl">
                        {`import { Button, Input, Badge, Icon, StatCard } from '@aposis/design-system';
import { IconSearch } from '@tabler/icons-react';

export function MyComponent() {
  return (
    <div>
      <StatCard title="Total" value="120" />
      <Button variant="primary" leftIcon={<Icon icon={IconSearch} size="sm" />}>
        Cari
      </Button>
    </div>
  );
}`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </DocCard>
            )}
          </div>
        </main>
      </div>

      {/* Example Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Konfirmasi Penghapusan Data"
        description="Tindakan ini tidak dapat dibatalkan setelah diproses."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button
              variant="danger"
              leftIcon={<Icon icon={IconTrash} size="sm" />}
              onClick={() => {
                alert("Data berhasil dihapus!");
                setIsModalOpen(false);
              }}
            >
              Hapus Sekarang
            </Button>
          </>
        }
      >
        <p>
          Apakah Anda yakin ingin menghapus catatan data siswa ini dari sistem
          repositori Aposis?
        </p>
      </Modal>
    </div>
  );
}
