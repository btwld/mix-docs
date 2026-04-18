/// RemixTooltip Example
///
/// Three tooltips showcasing different wait/show durations on hover.

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
    return Row(
      mainAxisAlignment: .center,
      mainAxisSize: .min,
      spacing: 24,
      children: [
        RemixTooltip(
          tooltipChild: const Text('Default tooltip'),
          style: styleDefault,
          child: const _TriggerButton(label: 'Default'),
        ),
        RemixTooltip(
          tooltipChild: const Text('Quick tooltip!'),
          style: styleFast,
          child: const _TriggerButton(label: 'Fast'),
        ),
        RemixTooltip(
          tooltipChild: const Text('Slow tooltip'),
          style: styleSlow,
          child: const _TriggerButton(label: 'Slow'),
        ),
      ],
    );
  }

  RemixTooltipStyle get styleDefault {
    return RemixTooltipStyle()
        .padding(EdgeInsetsGeometryMix.symmetric(horizontal: 12, vertical: 8))
        .color(Colors.black87)
        .borderRadius(BorderRadiusGeometryMix.all(const .circular(6)))
        .wrap(
          WidgetModifierConfig.defaultTextStyle(
            style: TextStyleMix().color(Colors.white).fontSize(14),
          ),
        );
  }

  RemixTooltipStyle get styleFast {
    return styleDefault
        .waitDuration(const Duration(milliseconds: 100))
        .showDuration(const Duration(milliseconds: 800));
  }

  RemixTooltipStyle get styleSlow {
    return styleDefault
        .waitDuration(const Duration(seconds: 1))
        .showDuration(const Duration(seconds: 3));
  }
}

class _TriggerButton extends StatelessWidget {
  const _TriggerButton({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(label, style: const TextStyle(color: Colors.white)),
    );
  }
}
