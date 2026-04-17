/// RemixMenu Example
///
/// Dropdown menu with leading icons, a divider, and a destructive hover state.
/// Inspired by alignui — https://www.alignui.com/docs/v1.2/ui/dropdown

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
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
          style: menuItemStyle,
        ),
        RemixMenuItem(
          value: 'Settings',
          leadingIcon: Icons.settings,
          label: 'Settings',
          style: menuItemStyle,
        ),
        const RemixMenuDivider(),
        RemixMenuItem(
          value: 'Logout',
          leadingIcon: Icons.logout,
          label: 'Logout',
          style: menuItemStyle.onHovered(
            RemixMenuItemStyle()
                .color(Colors.redAccent.withValues(alpha: 0.05))
                .label(TextStyler().color(Colors.redAccent))
                .leadingIcon(IconStyler().color(Colors.redAccent)),
          ),
        ),
      ],
      positioning: const OverlayPositionConfig(
        offset: Offset(0, 8),
        followerAnchor: .topCenter,
        targetAnchor: .bottomCenter,
      ),
      style: menuStyle,
      onSelected: (_) {},
      controller: controller,
    );
  }

  RemixMenuStyle get menuStyle {
    return RemixMenuStyle()
        .trigger(
          RemixMenuTriggerStyle()
              .padding(EdgeInsetsMix.symmetric(horizontal: 14))
              .decoration(
                BoxDecorationMix()
                    .color(Colors.white)
                    .borderRadius(
                        BorderRadiusMix.all(const Radius.circular(12)))
                    .border(BorderMix.all(
                        BorderSideMix(color: Colors.blueGrey.shade100)))
                    .boxShadow([
                  BoxShadowMix(
                    color: Colors.blueGrey.withValues(alpha: 0.1),
                    blurRadius: 3,
                    offset: const Offset(0, 3),
                  ),
                ]),
              )
              .constraints(BoxConstraintsMix(minHeight: 40))
              .label(
                TextStyler()
                    .color(Colors.blueGrey.shade700)
                    .fontWeight(FontWeight.w400),
              ),
        )
        .overlay(
          FlexBoxStyler(
            padding: EdgeInsetsMix.all(12),
            decoration: BoxDecorationMix(
              color: Colors.white,
              borderRadius: BorderRadiusMix.all(const Radius.circular(12)),
              border: BorderMix.all(
                BorderSideMix(color: Colors.blueGrey.shade100),
              ),
              boxShadow: [
                BoxShadowMix(
                  color: Colors.blueGrey.withValues(alpha: 0.1),
                  blurRadius: 3,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
          ),
        )
        .divider(
          RemixDividerStyle()
              .color(Colors.blueGrey.shade100)
              .height(1)
              .marginY(6),
        );
  }

  RemixMenuItemStyle get menuItemStyle {
    return RemixMenuItemStyle()
        .paddingAll(6)
        .leadingIcon(IconStyler().size(20).color(Colors.blueGrey.shade800))
        .spacing(8)
        .borderRadiusAll(const Radius.circular(8))
        .label(TextStyler().color(Colors.blueGrey.shade800))
        .onHovered(RemixMenuItemStyle().color(Colors.blueGrey.shade50));
  }
}
