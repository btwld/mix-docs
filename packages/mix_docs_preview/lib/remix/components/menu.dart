/// RemixMenu Example
///
/// Fortal dropdown menu with menu items and a divider.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(FortalScope(child: const Example()));
}

class Example extends StatefulWidget {
  const Example({super.key});

  @override
  State<Example> createState() => _ExampleState();
}

class _ExampleState extends State<Example> {
  final controller = MenuController();

  @override
  Widget build(BuildContext context) {
    return RemixMenu<String>(
      trigger: const RemixMenuTrigger(label: 'Open Menu'),
      items: [
        RemixMenuItem(
          value: 'History',
          leadingIcon: Icons.history,
          label: 'History',
          style: FortalMenuItemStyles.soft(),
        ),
        RemixMenuItem(
          value: 'Settings',
          leadingIcon: Icons.settings,
          label: 'Settings',
          style: FortalMenuItemStyles.soft(),
        ),
        const RemixMenuDivider(),
        RemixMenuItem(
          value: 'Logout',
          leadingIcon: Icons.logout,
          label: 'Logout',
          style: FortalMenuItemStyles.soft(),
        ),
      ],
      style: FortalMenuStyles.soft(),
      onSelected: (_) {},
      controller: controller,
    );
  }
}
