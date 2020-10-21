from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'password',
            'is_teacher',
            'is_student',
        ]
        read_only_fields = ['is_teacher', 'is_student']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
        }


class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Teacher
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.get('user')
        password = user_data.pop('password')

        user = models.User(**user_data)

        # Hash and set the password.
        if password is not None:
            user.set_password(password)

        # Make this user a Teacher.
        user.is_teacher = True

        user.save()
        teacher = models.Teacher.objects.create(user=user)
        return teacher

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        instance.user.username = user_data.get(
            'username',
            instance.user.username,
        )
        instance.user.first_name = user_data.get(
            'first_name',
            instance.user.first_name,
        )
        instance.user.last_name = user_data.get(
            'last_name',
            instance.user.last_name,
        )

        if 'password' in user_data:
            instance.user.set_password(user_data.get('password'))

        instance.user.save()
        return instance
