using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Applies <see cref="RequiredAttribute"/> to every <see langword="object"/> in a <see cref="IEnumerable"/>. Doesn't check whether the property itself is <see langword="null"/>.
/// </summary>
[AttributeUsage(AttributeTargets.Property)]
internal sealed class ElementRequiredAttribute : RequiredAttribute
{
    public override bool IsValid(object? value)
    {
        if (value is null)
        {
            return true;
        }
        if (value is not IEnumerable)
        {
            ErrorMessage = $"The value is not a {nameof(IEnumerable)}.";
            return false;
        }
        int index = 0;
        foreach (object? element in (IEnumerable)value)
        {
            if (!base.IsValid(element))
            {
                ErrorMessage = $"The element at index {index} cannot be null";
                if (!AllowEmptyStrings)
                {
                    ErrorMessage += ", an empty string, or only contains whitespaces";
                }
                ErrorMessage += ".";
                return false;
            }
            index++;
        }
        return true;
    }
}
