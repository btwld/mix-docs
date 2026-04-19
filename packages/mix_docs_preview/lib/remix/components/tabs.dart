/// RemixTabs Example
///
/// Fortal-styled two-tab panel.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return FortalScope(brightness: .dark, child: const TabsPreview());
  }
}

class TabsPreview extends StatefulWidget {
  const TabsPreview({super.key});

  @override
  State<TabsPreview> createState() => _TabsPreviewState();
}

class _TabsPreviewState extends State<TabsPreview> {
  String _tab = 'tab1';

  @override
  Widget build(BuildContext context) {
    final tabStyle = FortalTabsStyles.base();
    return SizedBox(
      width: 320,
      height: 200,
      child: RemixTabs(
        selectedTabId: _tab,
        onChanged: (id) => setState(() => _tab = id),
        child: Column(
          mainAxisSize: .max,
          crossAxisAlignment: .stretch,
          children: [
            RemixTabBar(
              child: Row(
                mainAxisSize: .max,
                children: [
                  RemixTab(tabId: 'tab1', style: tabStyle, label: 'Tab 1'),
                  RemixTab(tabId: 'tab2', style: tabStyle, label: 'Tab 2'),
                ],
              ),
            ),
            const Expanded(
              child: RemixTabView(
                tabId: 'tab1',
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Align(
                    alignment: .topLeft,
                    child: Text('Content for Tab 1'),
                  ),
                ),
              ),
            ),
            const Expanded(
              child: RemixTabView(
                tabId: 'tab2',
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Align(
                    alignment: .topLeft,
                    child: Text('Content for Tab 2'),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
