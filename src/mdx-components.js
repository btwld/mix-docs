import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'; // nextra-theme-blog or your custom theme
import { Callout } from 'nextra/components';

import { CodeGroup } from '../components/CodeGroup';
import { DartPadEmbed } from '../components/DartPadEmbed';
import { FlutterMultiView } from '../components/FlutterMultiView';
import { FlutterPreview } from '../components/FlutterPreview';
import { FlutterSnippet } from '../components/FlutterSnippet';

// Get the default MDX components
const themeComponents = getThemeComponents()

const Info = (props) => <Callout type="info" {...props} />

// Merge components
export function useMDXComponents(components) {
    return {
        ...themeComponents,
        // Interactive embed components
        DartPadEmbed,
        FlutterPreview,
        FlutterMultiView,  // Multi-view mode: single engine, multiple views
        FlutterSnippet,
        // Remix docs shims
        CodeGroup,
        Info,
        ...components
    }
}
