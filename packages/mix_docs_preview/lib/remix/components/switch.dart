/// RemixSwitch Example
///
/// Animated toggle switch with a keyframed thumb squish on change.

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
  final ValueNotifier<bool> _selected = ValueNotifier(false);

  @override
  void dispose() {
    _selected.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RemixSwitch(
      style: style,
      selected: _selected.value,
      onChanged: (value) {
        setState(() {
          _selected.value = value;
        });
      },
    );
  }

  RemixSwitchStyle get style {
    return RemixSwitchStyle()
        .thumbColor(Colors.grey.shade600)
        .trackColor(Colors.deepPurpleAccent.shade200)
        .size(65, 30)
        .borderRadiusAll(const Radius.circular(40))
        .alignment(_selected.value ? .centerRight : .centerLeft)
        .animate(AnimationConfig.easeOut(300.ms))
        .thumb(
          BoxStyler()
              .color(Colors.white)
              .size(40, 30)
              .borderRounded(40)
              .scale(0.85)
              .shadowOnly(
                color: Colors.black.withValues(alpha: 0.1),
                offset: const Offset(2, 4),
                blurRadius: 4,
                spreadRadius: 3,
              )
              .keyframeAnimation(
                trigger: _selected,
                timeline: [
                  KeyframeTrack<double>(
                    'scale',
                    [
                      Keyframe.easeOutSine(1.25, 200.ms),
                      Keyframe.elasticOut(0.85, 500.ms),
                    ],
                    initial: 0.85,
                  ),
                  KeyframeTrack<double>(
                    'width',
                    [
                      Keyframe.decelerate(50, 100.ms),
                      Keyframe.linear(50, 100.ms),
                      Keyframe.elasticOut(40, 500.ms),
                    ],
                    initial: 40,
                    tweenBuilder: Tween.new,
                  ),
                ],
                styleBuilder: (values, style) =>
                    style.scale(values.get('scale')).width(values.get('width')),
              ),
        );
  }
}
